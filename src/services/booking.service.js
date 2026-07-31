import { Op } from "sequelize";

import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import User from "../models/user.model.js";

import AppError from "../utils/appError.js";
import { paginate, getPagingData } from "../utils/pagination.js";



const generateBookingReference = () => {

    return `ECR-${Date.now()}-${Math.floor(
        Math.random() * 1000
    )}`;

};


export const createBookingService = async (
    userId,
    body
) => {

    const {
        rideId,
        numberOfSeats,
    } = body;

    const ride =
        await Ride.findByPk(rideId);

    if (!ride) {

        throw new AppError(
            "Ride not found.",
            404
        );

    }

    if (ride.status !== "SCHEDULED") {

        throw new AppError(
            "Ride is unavailable.",
            400
        );

    }

    if (
        ride.remainingSeats <
        numberOfSeats
    ) {

        throw new AppError(
            "Not enough seats available.",
            400
        );

    }

    const vehicle = await Vehicle.findByPk(ride.vehicleId);

    const driver = await DriverProfile.findByPk(vehicle.driverId);

    if (driver.userId === userId) {

        throw new AppError(
            "You cannot book your own ride.",
            400
        );

    }

    const fare =
        Number(ride.pricePerSeat) *
        Number(numberOfSeats);
    
        const existingBooking = await Booking.findOne({

            where: {
                passengerId: userId,
                rideId,
                bookingStatus: {
                    [Op.ne]: "CANCELLED",
                },

            },

        });

    if (existingBooking) {

    throw new AppError(
        "You have already booked this ride.",
        400
    );

}
    const booking =
        await Booking.create({

            passengerId: userId,

            rideId,

            bookingReference:
                generateBookingReference(),

            numberOfSeats,

            fare,

        });

    ride.remainingSeats -=
        numberOfSeats;

    await ride.save();

    return booking;

};


export const getMyBookingsService = async (
    userId,
    query
) => {

    const {
        page,
        limit,
        status,
    } = query;

    const pagination =
        paginate({
            page,
            limit,
        });

    const where = {

        passengerId: userId,

    };

    if (status) {

        where.bookingStatus =
            status.toUpperCase();

    }

    const { count, rows } =
        await Booking.findAndCountAll({

            where,

            include: [

                Ride,

            ],

            limit:
                pagination.limit,

            offset:
                pagination.offset,

            order: [

                ["createdAt", "DESC"],

            ],

        });

    return getPagingData(

        count,

        rows,

        pagination.currentPage,

        pagination.limit

    );

};


export const getBookingByIdService =
async (
    userId,
    bookingId
) => {

    const booking =
        await Booking.findOne({

            where: {

                id: bookingId,

                passengerId: userId,

            },

            include: [

                Ride,

            ],

        });

    if (!booking) {

        throw new AppError(
            "Booking not found.",
            404
        );

    }

    return booking;

};


export const cancelBookingService =
async (
    userId,
    bookingId
) => {

    const booking =
        await getBookingByIdService(

            userId,

            bookingId

        );

    if (
        booking.bookingStatus !==
        "PENDING"
    ) {

        throw new AppError(
            "Booking cannot be cancelled.",
            400
        );

    }

    booking.bookingStatus =
        "CANCELLED";

    booking.cancelledAt =
        new Date();

    await booking.save();

    const ride =
        await Ride.findByPk(
            booking.rideId
        );

    ride.remainingSeats +=
        booking.numberOfSeats;

    await ride.save();

    return booking;

};


export const confirmBookingService = async (
    userId,
    bookingId) => {

    const booking = await Booking.findByPk(bookingId, {
        include: [Ride],
    });

    if (!booking) {
        throw new AppError(
            "Booking not found.",
            404
        );
    }

    const driver = await DriverProfile.findOne({
        where: {
            userId,
        },
    });

    if (!driver) {
        throw new AppError(
            "Driver not found.",
            404
        );
    }

    const vehicle = await Vehicle.findOne({
        where: {
            id: booking.Ride.vehicleId,
        },
    });

    if (!vehicle || vehicle.driverId !== driver.id) {
        throw new AppError(
            "Unauthorized.",
            403
        );
    }

    booking.bookingStatus = "CONFIRMED";

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