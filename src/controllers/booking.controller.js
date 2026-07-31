import {
    createBookingService,
    getMyBookingsService,
    getBookingByIdService,
    cancelBookingService,
    confirmBookingService,
} from "../services/booking.service.js";

import { successResponse } from "../utils/response.js";

export const createBooking = async (req, res, next) => {
    try {

        const booking = await createBookingService(
            req.user.id,
            req.body
        );

        return successResponse(
            res,
            201,
            "Booking created successfully.",
            booking
        );

    } catch (error) {
        next(error);
    }
};

export const getMyBookings = async (req, res, next) => {
    try {

        const bookings = await getMyBookingsService(
            req.user.id,
            req.query
        );

        return successResponse(
            res,
            200,
            "Bookings retrieved successfully.",
            bookings
        );

    } catch (error) {
        next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {

        const booking = await getBookingByIdService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Booking retrieved successfully.",
            booking
        );

    } catch (error) {
        next(error);
    }
};

export const cancelBooking = async (req, res, next) => {
    try {

        const booking = await cancelBookingService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Booking cancelled successfully.",
            booking
        );

    } catch (error) {
        next(error);
    }
};

export const confirmBooking = async (req, res, next) => {
    try {

        const booking = await confirmBookingService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Booking confirmed successfully.",
            booking
        );

    } catch (error) {
        next(error);
    }
};