import { Op } from "sequelize";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import Vehicle from "../models/vehicle.model.js";
import DriverProfile from "../models/driver.model.js";

import AppError from "../utils/AppError.js";
import { paginate, getPagingData } from "../utils/pagination.js";


const getDriverVehicle = async (userId) => {

    const driver = await DriverProfile.findOne({
        where: {
            userId,
            verificationStatus: "APPROVED",
        },
    });

    if (!driver) {
        throw new AppError(
            "Approved driver profile not found.",
            404
        );
    }

    const vehicle = await Vehicle.findOne({
        where: {
            driverId: driver.id,
            verificationStatus: "APPROVED",
        },
    });

    if (!vehicle) {
        throw new AppError(
            "No approved vehicle found.",
            404
        );
    }

    return vehicle;
};

export const createRideService = async (
    userId,
    rideData
) => {

    const vehicle =
        await getDriverVehicle(userId);

    const ride = await Ride.create({
    ...rideData,
    remainingSeats: rideData.availableSeats,
    vehicleId: vehicle.id,
});
        return ride;

};


export const getAllRidesService = async (
    query
) => {

    const {
        page,
        limit,
        pickup,
        destination,
        status,
    } = query;

    const pagination = paginate({
        page,
        limit,
    });

    const where = {};

    if (pickup) {
        where.pickupLocation = {
            [Op.iLike]: `%${pickup}%`,
        };
    }

    if (destination) {
        where.destination = {
            [Op.iLike]: `%${destination}%`,
        };
    }

    if (status) {
        where.status = status.toUpperCase();
    }

    const { count, rows } =
        await Ride.findAndCountAll({

            where,

            include: [
                Vehicle,
            ],

            limit: pagination.limit,

            offset: pagination.offset,

            order: [
                ["departureTime", "ASC"],
            ],
        });

    return getPagingData(
        count,
        rows,
        pagination.currentPage,
        pagination.limit
    );
};

export const getRideByIdService = async (
    userId,
    rideId
) => {

    const vehicle =
        await getDriverVehicle(userId);

    const ride = await Ride.findOne({

        where: {
            id: rideId,
            vehicleId: vehicle.id,
        },

        include: [
            Vehicle,
        ],

    });

    if (!ride) {

        throw new AppError(
            "Ride not found.",
            404
        );

    }

    return ride;

};

export const updateRideService = async (
    userId,
    rideId,
    body
) => {

    const ride =
        await getRideByIdService(
            userId,
            rideId
        );

    if (ride.status !== "SCHEDULED") {

        throw new AppError(
            "Only scheduled rides can be updated.",
            400
        );

    }

    await ride.update(body);

    return ride;

};

export const deleteRideService = async (
    userId,
    rideId
) => {

    const ride =
        await getRideByIdService(
            userId,
            rideId
        );

    if (ride.status !== "SCHEDULED") {

        throw new AppError(
            "Only scheduled rides can be deleted.",
            400
        );

    }

    await ride.destroy();

};





export const cancelRideService = async (
    userId,
    rideId
) => {

    // Find driver
    const driver = await DriverProfile.findOne({
        where: { userId }
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
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

    // Ownership check
    if (vehicle.driverId !== driver.id) {
        throw new AppError(
            "Unauthorized.",
            403
        );
    }

    if (ride.status === "COMPLETED") {
        throw new AppError(
            "Completed ride cannot be cancelled.",
            400
        );
    }

    if (ride.status === "CANCELLED") {
        throw new AppError(
            "Ride already cancelled.",
            400
        );
    }

    // Cancel ride
    ride.status = "CANCELLED";
    await ride.save();

    // Cancel every pending/confirmed booking
    const bookings = await Booking.findAll({
        where: {
            rideId,
            bookingStatus: {
                [Op.in]: [
                    "PENDING",
                    "CONFIRMED"
                ]
            }
        }
    });

    for (const booking of bookings) {

        booking.bookingStatus = "CANCELLED";
        booking.cancelReason =
            "Ride cancelled by driver.";
        booking.cancelledAt = new Date();

        await booking.save();
    }

    return ride;

};

export const getDriverRideHistoryService = async (
    userId
) => {

    const vehicle =
        await getDriverVehicle(userId);

    return Ride.findAll({

        where: {
            vehicleId: vehicle.id,
        },

        include: [
            Vehicle,
        ],

        order: [
            ["departureTime", "DESC"],
        ],

    });

};

export const searchRidesService = async (
    query
) => {

    const {
        pickup,
        destination,
        departureDate,
        seats = 1,
        page,
        limit,
    } = query;

    const pagination = paginate({
        page,
        limit,
    });

    const where = {

        status: "SCHEDULED",

        remainingSeats: {
            [Op.gte]: Number(seats),
        },

    };

    if (destination) {

        where.destination = {
            [Op.iLike]: `%${destination}%`,
        };

    }

    if (pickup) {

        where.pickupLocation = {
            [Op.iLike]: `%${pickup}%`,
        };

    }

    if (departureDate) {
        where.departureTime = {
            [Op.between]: [
                new Date(`${departureDate}T00:00:00`),
                new Date(`${departureDate}T23:59:59`)
            ]
        };

    }

    const {
        count,
        rows,
    } = await Ride.findAndCountAll({

        where,

        include: [
            {

                model: Vehicle,

                include: [
                    {
                        model: DriverProfile,
                        include: [User]
                    }

                ]

            }

        ],

        order: [
            ["departureTime", "ASC"],
        ],

        limit:
            pagination.limit,

        offset:
            pagination.offset,

    });

    return getPagingData(

        count,

        rows,

        pagination.currentPage,

        pagination.limit

    );

};

export const startRideService = async (
    userId,
    rideId
) => {

    const driver = await DriverProfile.findOne({
        where: { userId }
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    const ride = await Ride.findByPk(rideId);

    if (!ride) {
        throw new AppError(
            "Ride not found.",
            404
        );
    }

    const vehicle = await Vehicle.findByPk(
        ride.vehicleId
    );

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    if (vehicle.driverId !== driver.id) {
        throw new AppError(
            "Unauthorized.",
            403
        );
    }

    if (ride.status === "ONGOING") {
        throw new AppError(
            "Ride already started.",
            400
        );
    }

    if (ride.status === "COMPLETED") {
        throw new AppError(
            "Ride already completed.",
            400
        );
    }

    if (ride.status === "CANCELLED") {
        throw new AppError(
            "Cancelled ride cannot be started.",
            400
        );
    }

    ride.status = "ONGOING";

    await ride.save();

    return ride;

};

export const completeRideService = async (
    userId,
    rideId
) => {

    // Find driver
    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
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

    // Ownership check
    if (vehicle.driverId !== driver.id) {
        throw new AppError(
            "Unauthorized.",
            403
        );
    }

    if (ride.status === "COMPLETED") {
        throw new AppError(
            "Ride already completed.",
            400
        );
    }

    if (ride.status === "CANCELLED") {
        throw new AppError(
            "Cancelled ride cannot be completed.",
            400
        );
    }

    if (ride.status !== "ONGOING") {
        throw new AppError(
            "Only ongoing rides can be completed.",
            400
        );
    }

    // Complete ride
    ride.status = "COMPLETED";
    await ride.save();

    // Complete all confirmed bookings
    await Booking.update(
        {
            bookingStatus: "COMPLETED",
        },
        {
            where: {
                rideId,
                bookingStatus: "CONFIRMED",
            },
        }
    );

    return ride;

};