
import {
    rateDriverService,
    ratePassengerService,
    getMyRatingsService,
    getDriverRatingsService,
    getPassengerRatingsService,

} from "../services/rating.service.js";

import {
    successResponse,
} from "../utils/response.js";


export const rateDriver = async (
    req,
    res,
    next
) => {

    try {

        const rating =
            await rateDriverService(

                req.user.id,

                req.params.bookingId,

                req.body.rating,

                req.body.comment

            );

        return successResponse(

            res,

            201,

            "Driver rated successfully.",

            rating

        );

    } catch (error) {

        next(error);

    }

};

export const ratePassenger = async (
    req,
    res,
    next
) => {

    try {

        const rating =
            await ratePassengerService(

                req.user.id,

                req.params.bookingId,

                req.body.rating,

                req.body.comment

            );

        return successResponse(

            res,

            201,

            "Passenger rated successfully.",

            rating

        );

    } catch (error) {

        next(error);

    }

};

export const getMyRatings = async (
    req,
    res,
    next
) => {

    try {

        const ratings =
            await getMyRatingsService(
                req.user.id
            );

        return successResponse(

            res,

            200,

            "Ratings retrieved successfully.",

            ratings

        );

    } catch (error) {

        next(error);

    }

};

export const getDriverRatings = async (
    req,
    res,
    next
) => {

    try {

        const ratings =
            await getDriverRatingsService(
                req.params.driverId
            );

        return successResponse(
            res,
            200,
            "Driver ratings retrieved successfully.",
            ratings
        );

    } catch (error) {

        next(error);

    }

};

export const getPassengerRatings = async (
    req,
    res,
    next
) => {

    try {

        const ratings =
            await getPassengerRatingsService(
                req.params.passengerId
            );

        return successResponse(
            res,
            200,
            "Passenger ratings retrieved successfully.",
            ratings
        );

    } catch (error) {

        next(error);

    }

};