import { Op } from "sequelize";

import AppError from "../utils/AppError.js";

import Rating from "../models/rating.model.js";
import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import Vehicle from "../models/vehicle.model.js";
import DriverProfile from "../models/driver.model.js";
import User from "../models/user.model.js";


export const rateDriverService = async (
    userId,
    bookingId,
    rating,
    comment
) => {

    const booking = await Booking.findOne({

        where: {
            id: bookingId,
            passengerId: userId,
            bookingStatus: "COMPLETED",
        },

        include: [
            {
                model: Ride,
                include: [
                    Vehicle,
                ],
            },
        ],

    });

    if (!booking) {

        throw new AppError(
            "Completed booking not found.",
            404
        );

    }

    const driver =
        await DriverProfile.findByPk(
            booking.Ride.Vehicle.driverId
        );

    const existingRating =
        await Rating.findOne({

            where: {
                bookingId,
                reviewerId: userId,
            },

        });

    if (existingRating) {

        throw new AppError(
            "You have already rated this trip.",
            400
        );

    }

    return await Rating.create({

        bookingId,

        reviewerId: userId,

        revieweeId: driver.userId,

        reviewerRole: "PASSENGER",

        driverRating: rating,

        comment,

    });

};

export const ratePassengerService = async (
    userId,
    bookingId,
    rating,
    comment
) => {

    const driver =
        await DriverProfile.findOne({

            where: {
                userId,
            },

        });

    if (!driver) {

        throw new AppError(
            "Driver profile not found.",
            404
        );

    }

    const booking =
        await Booking.findOne({

            where: {
                id: bookingId,
                bookingStatus: "COMPLETED",
            },

            include: [
                {
                    model: Ride,
                    include: [
                        Vehicle,
                    ],
                },
            ],

        });

    if (!booking) {

        throw new AppError(
            "Completed booking not found.",
            404
        );

    }

    if (
        booking.Ride.Vehicle.driverId !==
        driver.id
    ) {

        throw new AppError(
            "Unauthorized.",
            403
        );

    }

    const existingRating =
        await Rating.findOne({

            where: {
                bookingId,
                reviewerId: userId,
            },

        });

    if (existingRating) {

        throw new AppError(
            "You have already rated this passenger.",
            400
        );

    }

    return await Rating.create({

        bookingId,

        reviewerId: userId,

        revieweeId: booking.passengerId,

        reviewerRole: "DRIVER",

        passengerRating: rating,

        comment,

    });

};

export const getMyRatingsService = async (
    userId
) => {

    const ratings =
        await Rating.findAll({

            where: {
                revieweeId: userId,
            },

            include: [
                {
                    model: User,
                    as: "Reviewer",

                    attributes: [
                        "firstName",
                        "lastName",
                        "profilePicture",
                    ],
                },
            ],

            order: [
                [
                    "createdAt",
                    "DESC",
                ],
            ],

        });

    const totalRatings =
        ratings.length;

    const averageRating =
        totalRatings
            ? ratings.reduce(

                  (
                      total,
                      rating
                  ) =>

                      total +
                      Number(
                          rating.driverRating ??
                          rating.passengerRating
                      ),

                  0

              ) / totalRatings
            : 0;

    return {

        averageRating:
            Number(
                averageRating.toFixed(1)
            ),

        totalRatings,

        ratings,

    };

};

export const getDriverRatingsService = async (
    driverId
) => {

    const driver =
        await DriverProfile.findByPk(driverId);

    if (!driver) {

        throw new AppError(
            "Driver not found.",
            404
        );

    }

    const ratings =
        await Rating.findAll({

            where: {
                revieweeId: driver.userId,
            },

            include: [
                {
                    model: User,
                    as: "Reviewer",
                    attributes: [
                        "firstName",
                        "lastName",
                        "profilePicture",
                    ],
                },
            ],

            order: [
                ["createdAt", "DESC"],
            ],

        });

    const totalRatings =
        ratings.length;

    const averageRating =
        totalRatings
            ? ratings.reduce(
                  (sum, rating) =>
                      sum +
                      Number(
                          rating.driverRating || 0
                      ),
                  0
              ) / totalRatings
            : 0;

    return {

        averageRating:
            Number(
                averageRating.toFixed(1)
            ),

        totalRatings,

        ratings,

    };

};

export const getPassengerRatingsService = async (
    passengerId
) => {

    const passenger =
        await User.findByPk(passengerId);

    if (!passenger) {

        throw new AppError(
            "Passenger not found.",
            404
        );

    }

    const ratings =
        await Rating.findAll({

            where: {
                revieweeId: passengerId,
            },

            include: [
                {
                    model: User,
                    as: "Reviewer",
                    attributes: [
                        "firstName",
                        "lastName",
                        "profilePicture",
                    ],
                },
            ],

            order: [
                ["createdAt", "DESC"],
            ],

        });

    const totalRatings =
        ratings.length;

    const averageRating =
        totalRatings
            ? ratings.reduce(
                  (sum, rating) =>
                      sum +
                      Number(
                          rating.passengerRating || 0
                      ),
                  0
              ) / totalRatings
            : 0;

    return {

        averageRating:
            Number(
                averageRating.toFixed(1)
            ),

        totalRatings,

        ratings,

    };

};