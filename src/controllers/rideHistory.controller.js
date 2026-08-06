import { getRideHistoryService } from "../services/rideHistory.service.js";
import { successResponse } from "../utils/response.js";

export const getRideHistory = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await getRideHistoryService(
                req.user,
                req.query
            );

        return successResponse(
            res,
            200,
            "Ride history retrieved successfully.",
            data
        );

    } catch (error) {

        next(error);

    }

};