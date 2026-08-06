import sequelize from "../config/database.js";
import { Op } from "sequelize";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import Payment  from "../models/payment.model.js";
import  generatePaymentReference  from "../utils/generatePaymentReference.js";
import { debitWallet,
        creditWallet
 } from "./wallet.service.js";

import Vehicle from "../models/vehicle.model.js";
import DriverProfile from "../models/driver.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import AppError from "../utils/AppError.js";
import { paginate, getPagingData } from "../utils/pagination.js";
import {calculateAvailableSeats} from "../helpers/calculateAvailableSeats.js"
import { createNotification } from "./notification.service.js";

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

    const {
        vehicleId,
    } = rideData;

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

    const vehicle =
        await Vehicle.findOne({
            where: {
                id: vehicleId,
                driverId: driver.id,
                verificationStatus: "APPROVED",
            },
            include: [
                VehicleInspection,
            ],
        });

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found or not approved.",
            404
        );
    }

    const inspection =
        vehicle.VehicleInspection;

    if (
        !inspection ||
        inspection.inspectionStatus !== "PASSED"
    ) {
        throw new AppError(
            "Vehicle inspection has not passed.",
            400
        );
    }

    return await Ride.create({
        ...rideData,
        remainingSeats:
            rideData.availableSeats,
        vehicleId,
        allowRecurringBooking:
            rideData.allowRecurringBooking ?? false,
    });

};

export const getAllRidesService = async (query) => {

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

    const rides = [];

    for (const ride of rows) {

        const travelDate =
            ride.departureTime
                .toISOString()
                .split("T")[0];

        const availableSeats =
            await calculateAvailableSeats(
                ride,
                travelDate
            );

        ride.setDataValue(
            "remainingSeats",
            availableSeats
        );

        rides.push(ride);

    }

    return getPagingData(
        count,
        rides,
        pagination.currentPage,
        pagination.limit
    );

};

export const getRideByIdService = async (
    userId,
    rideId
) => {

    const ride = await Ride.findByPk(rideId, {

        include: [

            {
                model: Vehicle,

                include: [

                    {
                        model: DriverProfile,

                        include: [
                            {
                                model: User,
                                attributes: [
                                    "id",
                                    "firstName",
                                    "lastName",
                                    "email",
                                    "phoneNumber",
                                    "profilePicture",
                                ],
                            },
                        ],
                    },

                ],

            },

        ],

    });

    if (!ride) {

        throw new AppError(
            "Ride not found.",
            404
        );

    }

    const travelDate =
        new Date()
            .toISOString()
            .split("T")[0];

    ride.setDataValue(
        "remainingSeats",
        await calculateAvailableSeats(
            ride,
            travelDate
        )
    );

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
    userId, rideId) => {

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
                    "ACCEPTED"
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

export const searchRidesService = async (query) => {

    const {
        pickup,
        destination,
        departureDate,
        seats = 1,
        minPrice,
        maxPrice,
        vehicleType,
        verifiedOnly,
        page,
        limit,
    } = query;

    const pagination = paginate({
        page,
        limit,
    });

    const where = {
        status: {
            [Op.in]: ["SCHEDULED", "ACCEPTED"],
        },
    };

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

    if (departureDate) {

        if (isNaN(Date.parse(departureDate))) {
            throw new AppError(
                "departureDate must be in YYYY-MM-DD format.",
                400
            );
        }

        where.departureTime = {
            [Op.between]: [
                new Date(`${departureDate}T00:00:00`),
                new Date(`${departureDate}T23:59:59`),
            ],
        };
    }

    if (minPrice || maxPrice) {

        where.pricePerSeat = {};

        if (minPrice) {
            where.pricePerSeat[Op.gte] = Number(minPrice);
        }

        if (maxPrice) {
            where.pricePerSeat[Op.lte] = Number(maxPrice);
        }
    }

    const { rows } = await Ride.findAndCountAll({

        where,

        include: [
            {
                model: Vehicle,

                where: vehicleType
                    ? { vehicleType }
                    : undefined,

                attributes: [
                    "brand",
                    "model",
                    "year",
                    "color",
                    "plateNumber",
                    "vehicleType",
                    "seatCapacity",
                ],

                include: [
                    {
                        model: DriverProfile,

                        attributes: [
                            "yearsOfExperience",
                        ],

                        include: [
                            {
                                model: User,

                                attributes: [
                                    "id",
                                    "firstName",
                                    "lastName",
                                    "profilePicture",
                                    "phoneNumber",
                                    "isVerified",
                                ],

                                where:
                                    verifiedOnly === "true"
                                        ? {
                                              isVerified: true,
                                          }
                                        : undefined,
                            },
                        ],
                    },
                ],
            },
        ],

        order: [
            ["departureTime", "ASC"],
            ["pricePerSeat", "ASC"],
        ],

        limit: pagination.limit,
        offset: pagination.offset,

    });

    const travelDate =
        departureDate ||
        new Date().toISOString().split("T")[0];

    const rides = [];

    for (const ride of rows) {

        const availableSeats =
            await calculateAvailableSeats(
                ride,
                travelDate
            );

        if (availableSeats < Number(seats)) {
            continue;
        }

        rides.push({

            id: ride.id,

            pickupLocation:
                ride.pickupLocation,

            destination:
                ride.destination,

            departureTime:
                ride.departureTime,

            pricePerSeat:
                Number(ride.pricePerSeat),

            availableSeats,

            status:
                ride.status,

            driver: {

                id:
                    ride.Vehicle?.DriverProfile?.User?.id,

                firstName:
                    ride.Vehicle?.DriverProfile?.User?.firstName,

                lastName:
                    ride.Vehicle?.DriverProfile?.User?.lastName,

                profilePicture:
                    ride.Vehicle?.DriverProfile?.User?.profilePicture,

                verified:
                    ride.Vehicle?.DriverProfile?.User?.isVerified ?? false,

                yearsOfExperience:
                    ride.Vehicle?.DriverProfile?.yearsOfExperience ?? 0,

            },

            vehicle: {

                brand:
                    ride.Vehicle?.brand,

                model:
                    ride.Vehicle?.model,

                year:
                    ride.Vehicle?.year,

                color:
                    ride.Vehicle?.color,

                plateNumber:
                    ride.Vehicle?.plateNumber,

                vehicleType:
                    ride.Vehicle?.vehicleType,

                seatCapacity:
                    ride.Vehicle?.seatCapacity,

            },

        });

    }

    return getPagingData(
        rides.length,
        rides,
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
    const confirmedBookings =
    await Booking.findAll({

        where: {

            rideId,

            bookingStatus: "ACCEPTED",

        },

    });

if (!confirmedBookings.length) {

    throw new AppError(
        "No confirmed passengers.",
        400
    );

}

const notAcknowledged =
    confirmedBookings.find(
        booking => !booking.passengerAcknowledged
    );

    if (notAcknowledged) {

        throw new AppError(
            "All passengers must acknowledge arrival before starting the ride.",
            400
        );

    }

    ride.status = "ONGOING";
    await ride.save();
   
    for (const booking of confirmedBookings) {

    await createNotification({
        userId: booking.passengerId,
        title: "Ride Started",
        message: "Your trip has started.",
        type: "RIDE",
        referenceId: ride.id,
    });

}
    return ride;

};

export const completeRideService = async (
    userId,
    rideId
) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
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

    const bookings = await Booking.findAll({
        where: {
            rideId,
            bookingStatus: "ACCEPTED",
        },
    });

    if (!bookings.length) {
        throw new AppError(
            "No accepted bookings found.",
            400
        );
    }
    
    const transaction = await sequelize.transaction();

try {

    let totalDriverEarnings = 0;

    for (const booking of bookings) {

        const existingPayment = await Payment.findOne({
            where: {
                bookingId: booking.id,
                paymentType: "BOOKING",
                paymentStatus: "SUCCESS",
            },
            transaction,
        });

        let payment = existingPayment;

        if (!payment) {

            payment = await Payment.create({
                userId: booking.passengerId,
                bookingId: booking.id,
                amount: booking.fare,
                paymentMethod: "WALLET",
                paymentStatus: "SUCCESS",
                paymentType: "BOOKING",
                reference: generatePaymentReference(),
            }, { transaction });

            await debitWallet(
                booking.passengerId,
                booking.fare,
                {
                    paymentId: payment.id,
                    type: "BOOKING_PAYMENT",
                    description: `Payment for booking ${booking.bookingReference}`,
                    transaction,
                }
            );

        }

        totalDriverEarnings += Number(booking.fare);

        booking.bookingStatus = "COMPLETED";

        await booking.save({ transaction });

        await createNotification({
            userId: booking.passengerId,
            title: "Trip Completed",
            message: `₦${booking.fare} has been deducted for your completed trip.`,
            type: "PAYMENT",
            referenceId: payment.id,
        });

    }

    await creditWallet(
        driver.userId,
        totalDriverEarnings,
        {
            paymentId: null,
            type: "TRIP_EARNING",
            description: `Trip earnings for Ride ${ride.id}`,
            transaction,
        }
    );

    await createNotification({
        userId: driver.userId,
        title: "Trip Earnings",
        message: `₦${totalDriverEarnings} has been credited to your wallet.`,
        type: "PAYMENT",
        referenceId: ride.id,
    });

    ride.status = "COMPLETED";

    await ride.save({ transaction });

    await transaction.commit();

    return ride;

} catch (error) {

    await transaction.rollback();

    throw error;

}
}

export const driverArrivedService = async (
    userId,
    rideId
) => {

    const ride =
        await getRideByIdService(
            userId,
            rideId
        );

   if (ride.status !== "ACCEPTED") {

    throw new AppError(
        "Driver can only arrive after accepting the ride.",
        400
    );

}

    if (ride.driverArrivedAt) {

        throw new AppError(
            "Driver arrival has already been recorded.",
            400
        );

    }

    ride.driverArrivedAt = new Date();

    await ride.save();

    const bookings = await Booking.findAll({
        where: {
            rideId,
            bookingStatus: "ACCEPTED",
        },
    });

   for (const booking of bookings) {

    await createNotification({
        userId: booking.passengerId,
        title: "Driver Arrived",
        message: "Your driver has arrived.",
        type: "RIDE",
        referenceId: ride.id,
    });

}

    return ride;

};

export const updateRideLocationService = async (
    userId,
    rideId,
    body
) => {

    const ride =
        await getRideByIdService(
            userId,
            rideId
        );

    if (
    ride.status !== "ACCEPTED" &&
    ride.status !== "ONGOING"
) {
    throw new AppError(
        "Location updates are only available after a ride is accepted.",
        400
    );
}

    ride.currentLatitude =
        body.latitude;

    ride.currentLongitude =
        body.longitude;

    ride.lastLocationUpdate =
        new Date();

    await ride.save();

    return ride;

};

export const getRideLocationService = async (
    userId,
    rideId
) => {

    const booking =
        await Booking.findOne({

            where: {

                rideId,

                passengerId: userId,

                bookingStatus: "ACCEPTED",

            },

            include: [Ride],

        });

    if (!booking) {

        throw new AppError(
            "Ride not found.",
            404
        );

    }

    return {

        rideId,

        latitude:
            booking.Ride.currentLatitude,

        longitude:
            booking.Ride.currentLongitude,

        lastUpdated:
            booking.Ride.lastLocationUpdate,

        status:
            booking.Ride.status,

    };

};