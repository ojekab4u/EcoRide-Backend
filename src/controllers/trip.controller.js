import {
    requestTripService,
    getTripsService,
    getTripByIdService,
    acceptTripService,
    rejectTripService,
    arriveTripService,
    startTripService,
    completeTripService,
    cancelTripService,
} from "../services/trip.service.js";

import { successResponse } from "../utils/response.js";

export const requestTrip = async (req, res, next) => {
    try {

        const trip = await requestTripService();

        return successResponse(
            res,
            201,
            "Trip requested successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const getTrips = async (req, res, next) => {
    try {

        const trips = await getTripsService();

        return successResponse(
            res,
            200,
            "Trips retrieved successfully.",
            trips
        );

    } catch (error) {
        next(error);
    }
};

export const getTripById = async (req, res, next) => {
    try {

        const trip = await getTripByIdService();

        return successResponse(
            res,
            200,
            "Trip retrieved successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const acceptTrip = async (req, res, next) => {
    try {

        const trip = await acceptTripService();

        return successResponse(
            res,
            200,
            "Trip accepted successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const rejectTrip = async (req, res, next) => {
    try {

        const trip = await rejectTripService();

        return successResponse(
            res,
            200,
            "Trip rejected successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const arriveTrip = async (req, res, next) => {
    try {

        const trip = await arriveTripService();

        return successResponse(
            res,
            200,
            "Driver arrived successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const startTrip = async (req, res, next) => {
    try {

        const trip = await startTripService();

        return successResponse(
            res,
            200,
            "Trip started successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const completeTrip = async (req, res, next) => {
    try {

        const trip = await completeTripService();

        return successResponse(
            res,
            200,
            "Trip completed successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};

export const cancelTrip = async (req, res, next) => {
    try {

        const trip = await cancelTripService();

        return successResponse(
            res,
            200,
            "Trip cancelled successfully.",
            trip
        );

    } catch (error) {
        next(error);
    }
};