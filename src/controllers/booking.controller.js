import {
    createBookingService,
    getBookingsService,
    getBookingByIdService,
    cancelBookingService,
    confirmBookingService,
    getDriverBookingsService,
    rejectBookingsService,
    acknowledgeDriverArrivalService,
    
} from "../services/booking.service.js";

import { successResponse } from "../utils/response.js";

export const createBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await createBookingService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Ride booked successfully.",
            booking
        );

    } catch (error) {

        next(error);

    }

};

export const getBookings = async (req, res, next) => {
    try {

        const bookings = await getBookingsService(
            req.user);

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

export const cancelBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await cancelBookingService(
                req.params.id,
                req.body.reason
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

export const confirmBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await confirmBookingService(
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

export const getDriverBookings = async (
    req,
    res,
    next
) => {

    try {

        const bookings =
            await getDriverBookingsService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Driver bookings retrieved successfully.",
            bookings
        );

    } catch (error) {

        next(error);

    }

};

export const rejectBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await rejectBookingsService(
                req.user.id,
                req.params.id,
                req.body.reason
            );
            
        return successResponse(
            res,
            200,
            "Booking rejected successfully.",
            booking
        );

    } catch (error) {

        next(error);

    }

};

export const acknowledgeDriverArrival = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await acknowledgeDriverArrivalService(
                req.params.id,
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Driver arrival acknowledged.",
            booking
        );

    } catch (error) {

        next(error);

    }

};