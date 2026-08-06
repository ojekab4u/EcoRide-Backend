import { Op } from "sequelize";

import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";

export const getBookingHistoryService = async (
    userId,
    query
) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {
        passengerId: userId,
    };

    if (query.status) {
        where.bookingStatus =
            query.status.toUpperCase();
    }

    const { count, rows } =
        await Booking.findAndCountAll({

            where,

            include: [
                {
                    model: Ride,
                    attributes: [
                        "id",
                        "pickupLocation",
                        "destination",
                        "departureTime",                        
                        "status",
                        "pricePerSeat",
                    ],
                },
            ],

            order: [
                ["createdAt", "DESC"],
            ],

            limit,
            offset,

        });

    return {

        page,

        limit,

        totalPages:
            Math.ceil(count / limit),

        totalRecords:
            count,

        bookings:
            rows,

    };

};