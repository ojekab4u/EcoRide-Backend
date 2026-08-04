import { Op } from "sequelize";
import Booking from "../models/booking.model.js";

const WEEKDAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];

export const calculateAvailableSeats = async (
    ride,
    requestedDate
) => {

    const targetDate = new Date(requestedDate);

    const weekday =
        WEEKDAYS[targetDate.getDay()];

    const bookings = await Booking.findAll({
        where: {
            rideId: ride.id,
            bookingStatus: {
                [Op.in]: [
                    "PENDING",
                    "CONFIRMED",
                ],
            },
        },
    });

    let bookedSeats = 0;

    for (const booking of bookings) {

      
        // One-time booking
        if (!booking.isRecurring) {

            if (!booking.travelDate) {
                continue;
            }

            const bookingDate =
                new Date(booking.travelDate);

            if (
                bookingDate.toDateString() ===
                targetDate.toDateString()
            ) {
                bookedSeats += booking.numberOfSeats;
            }

            continue;
        }

        // Recurring booking
        const recurrenceDays =
            booking.recurrenceDays || [];

        if (
            !recurrenceDays.includes(weekday)
        ) {
            continue;
        }

        const startDate =
            new Date(booking.recurrenceStartDate);

        if (targetDate < startDate) {
            continue;
        }

        if (booking.recurrenceEndDate) {

            const endDate =
                new Date(booking.recurrenceEndDate);

            if (targetDate > endDate) {
                continue;
            }

        }

        bookedSeats += booking.numberOfSeats;

    }

    return Math.max(
        ride.availableSeats - bookedSeats,
        0
    );

};