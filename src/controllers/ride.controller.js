import {
    createRideService,
    getAllRidesService,
    getRideByIdService,
    updateRideService,
    deleteRideService,
    startRideService,
    completeRideService,
    cancelRideService,
    getDriverRideHistoryService,
} from "../services/ride.service.js";

import { successResponse } from "../utils/response.js";

export const createRide = async (
    req,
    res,
    next
) => {

    try {

        const ride =
            await createRideService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Ride created successfully.",
            ride
        );

    } catch (error) {

        next(error);

    }

};

export const getAllRides = async (
    req,
    res,
    next
) => {

    try {

        const rides =
            await getAllRidesService(
                req.query
            );

        return successResponse(
            res,
            200,
            "Rides retrieved successfully.",
            rides
        );

    } catch (error) {

        next(error);

    }

};

export const getRideById = async (
    req,
    res,
    next
) => {

    try {

        const ride =
            await getRideByIdService(
                req.user.id,
                req.params.id
            );

        return successResponse(
            res,
            200,
            "Ride retrieved successfully.",
            ride
        );

    } catch (error) {

        next(error);

    }

};

export const updateRide = async (
    req,
    res,
    next
) => {

    try {

        const ride =
            await updateRideService(
                req.user.id,
                req.params.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Ride updated successfully.",
            ride
        );

    } catch (error) {

        next(error);

    }

};

export const deleteRide = async (
    req,
    res,
    next
) => {

    try {

        await deleteRideService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Ride deleted successfully."
        );

    } catch (error) {

        next(error);

    }

};

export const startRide = async (
    req,
    res,
    next
) => {

    try {

        const ride =
            await startRideService(
                req.user.id,
                req.params.id
            );

        return successResponse(
            res,
            200,
            "Ride started successfully.",
            ride
        );

    } catch (error) {

        next(error);

    }

};

export const completeRide = async (
    req,
    res,
    next
) => {

    try {

        const ride =
            await completeRideService(
                req.user.id,
                req.params.id
            );

        return successResponse(
            res,
            200,
            "Ride completed successfully.",
            ride
        );

    } catch (error) {

        next(error);

    }

};

export const cancelRide = async (
    req,
    res,
    next
) => {

    try {

        const ride =
            await cancelRideService(
                req.user.id,
                req.params.id
            );

        return successResponse(
            res,
            200,
            "Ride cancelled successfully.",
            ride
        );

    } catch (error) {

        next(error);

    }

};

export const getDriverRideHistory = async (
    req,
    res,
    next
) => {

    try {

        const rides =
            await getDriverRideHistoryService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Ride history retrieved successfully.",
            rides
        );

    } catch (error) {

        next(error);

    }

};


export const searchRides = async (
    req, res, next
) => {

    try {
        const rides =
            await searchRidesService(
                req.query
            );

        return successResponse(
            res,
            200,
            "Matching rides retrieved successfully.",
            rides
        );

    } catch (error) {

        next(error);

    }

};