
import { Op } from "sequelize";

import Ride from "../models/ride.model.js";
import Booking from "../models/booking.model.js";
import DriverProfile from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";

import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";

export const getRideHistoryService = async (
    user,
    query
) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    if (user.role === ROLES.PASSENGER) {

        const where = {
    passengerId: user.id,
};

if (query.status) {

    const status = query.status.toUpperCase();
    where.bookingStatus = status;

}

        const { count, rows } =
            await Booking.findAndCountAll({

                where,

                include: [
                    {
                        model: Ride,
                    },
                ],

                limit,
                offset,

                order: [
                    ["createdAt", "DESC"],
                ],

            });

        return {
            page,
            totalPages:
                Math.ceil(count / limit),
            totalRecords: count,
            records: rows,
        };
    }

    if (user.role === ROLES.DRIVER) {

        const driver =
            await DriverProfile.findOne({
                where: {
                    userId: user.id,
                },
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
                    driverId: driver.id,
                },
            });

        if (!vehicle) {

            throw new AppError(
                "Vehicle not found.",
                404
            );

        }

        const where = {
            vehicleId: vehicle.id,
        };

        if (query.status) {

            const status = query.status.toUpperCase();

            where.status = status;

        }

        const { count, rows } =
            await Ride.findAndCountAll({

                where,

                limit,
                offset,

                order: [
                    ["createdAt", "DESC"],
                ],

            });

        return {
            page,
            totalPages:
                Math.ceil(count / limit),
            totalRecords: count,
            records: rows,
        };

    }

    throw new AppError(
        "Unsupported role.",
        403
    );

};