import { Op } from "sequelize";
import { paginate, getPagingData } from "../utils/pagination.js";
import DriverProfile from "../models/driver.model.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import PassengerProfile from "../models/passengerProfile.model.js";
import Vehicle from "../models/vehicle.model.js";
import AppError from "../utils/AppError.js";
import { generateBookingReference } from "../utils/generateBookingReference.js";




export const createBookingService = async (
    userId,
    bookingData
) => {

    const {
        rideId,
        numberOfSeats,
    } = bookingData;

    // Find passenger profile
    const passenger = await PassengerProfile.findOne({
        where: { userId },
    });

    if (!passenger) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    // Find ride
    const ride = await Ride.findByPk(rideId);

    if (!ride) {
        throw new AppError(
            "Ride not found.",
            404
        );
    }

    // Ride must be available
    if (ride.status !== "SCHEDULED") {
        throw new AppError(
            "This ride is no longer available for booking.",
            400
        );
    }

    // Get vehicle
    const vehicle = await Vehicle.findByPk(
        ride.vehicleId
    );

    // Prevent booking own ride
    if (
        vehicle &&
        vehicle.driverId === passenger.id
    ) {
        throw new AppError(
            "You cannot book your own ride.",
            400
        );
    }

    // Seat availability
    if (
        numberOfSeats >
        ride.remainingSeats
    ) {
        throw new AppError(
            "Not enough seats available.",
            400
        );
    }

    // Prevent duplicate active booking
    const existingBooking =
        await Booking.findOne({

            where: {
                passengerId: userId,
                rideId,
                bookingStatus: {
                    [Op.in]: [
                        "PENDING",
                        "CONFIRMED",
                    ],
                },

            },

        });

    if (existingBooking) {
        throw new AppError(
            "You already booked this ride.",
            400
        );
    }

    // Calculate fare
    const fare =
        ride.pricePerSeat *
        numberOfSeats;

    // Create booking
    const booking = await Booking.create({
        passengerId: userId,
        rideId,
        bookingReference: generateBookingReference(),
        numberOfSeats,
        fare,
    });
    // Reduce seats
    ride.remainingSeats -= numberOfSeats;

    await ride.save();

    return booking;

};

export const getBookingsService = async (user) => {

    let where = {};

    if (user.role === "PASSENGER") {
        where.passengerId = user.id;
    }

    const bookings = await Booking.findAll({
        where,
        include: [Ride],
        order: [["createdAt", "DESC"]],
    });

    return bookings;
};

export const getBookingByIdService = async (
    id
) => {

    const booking = await Booking.findByPk(id, {
        include: [Ride],
    });

    if (!booking) {

        throw new AppError(
            "Booking not found.",
            404
        );

    }
    return booking;

};

export const cancelBookingService = async (
    id,
    reason
) => {
    const booking = await Booking.findByPk(id);

    if (!booking) {
        throw new AppError(
            "Booking not found.",
            404
        );

    }

    if (booking.bookingStatus === "CANCELLED") {

        throw new AppError(
            "Booking already cancelled.",
            400
        );

    }

    const ride = await Ride.findByPk(
        booking.rideId
    );

    booking.bookingStatus = "CANCELLED";
    booking.cancelledAt = new Date();
    booking.cancelReason = reason;

    await booking.save();

    ride.remainingSeats +=
        booking.numberOfSeats;
    await ride.save();

    return booking;
};

export const confirmBookingService = async (
    id
) => {

    const booking = await Booking.findByPk(id);

    if (!booking) {

        throw new AppError(
            "Booking not found.",
            404
        );

    }

    booking.bookingStatus =
        "CONFIRMED";

    await booking.save();

    return booking;

};


export const getRideBookingsService = async (
    userId,
    rideId
) => {

    const ride = await getRideByIdService(
        userId,
        rideId
    );

    return Booking.findAll({

        where: {
            rideId,
        },

        include: [
            User,
        ],

        order: [
            ["createdAt", "DESC"],
        ],

    });

};

export const getDriverBookingsService = async (
    userId
) => {

    // Find driver's profile
    const driver =
        await DriverProfile.findOne({
            where: { userId },
        });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    // Find driver's vehicles
    const vehicles =
        await Vehicle.findAll({
            where: {
                driverId: driver.id,
            },
        });

    const vehicleIds =
        vehicles.map(v => v.id);

    if (!vehicleIds.length) {
        return [];
    }

    // Find rides created with those vehicles
    const rides =
        await Ride.findAll({
            where: {
                vehicleId: {
                    [Op.in]: vehicleIds,
                },
            },
        });

    const rideIds =
        rides.map(r => r.id);

    if (!rideIds.length) {
        return [];
    }

    // Return bookings
    const bookings =
        await Booking.findAll({

            where: {
                rideId: {
                    [Op.in]: rideIds,
                },
            },

            include: [

                {
                    model: Ride,
                },

                {
                    model: User,
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "phoneNumber",
                        "email",
                    ],
                },

            ],

            order: [
                ["createdAt", "DESC"],
            ],

        });

    return bookings;

};


export const rejectBookingsService = async (
    userId,
    bookingId,
    reason
) => {

    // Find driver profile
    const driver = await DriverProfile.findOne({
        where: { userId }
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    // Find booking
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        throw new AppError(
            "Booking not found.",
            404
        );
    }

    // Find ride
    const ride = await Ride.findByPk(
        booking.rideId
    );

    if (!ride) {
        throw new AppError(
            "Ride not found.",
            404
        );
    }

    // Find vehicle
    const vehicle = await Vehicle.findByPk(
        ride.vehicleId
    );

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    // Ensure ride belongs to logged-in driver
    if (vehicle.driverId !== driver.id) {
        throw new AppError(
            "Unauthorized.",
            403
        );
    }

    // Cannot reject completed booking
    if (
        booking.bookingStatus === "COMPLETED"
    ) {
        throw new AppError(
            "Completed booking cannot be rejected.",
            400
        );
    }

    booking.bookingStatus = "REJECTED";
    booking.cancelReason = reason;
    booking.cancelledAt = new Date();

    await booking.save();

    // Restore seats
    ride.remainingSeats += booking.numberOfSeats;

    await ride.save();

    return booking;

};