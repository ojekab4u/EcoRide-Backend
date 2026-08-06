import { getBookingHistoryService } from "../services/bookingHistory.service.js";
import { successResponse } from "../utils/response.js";


export const getBookingHistory = async (
    req,
    res,
    next
) => {

    try {

        const history =
            await getBookingHistoryService(
                req.user.id,
                req.query
            );

        return successResponse(
            res,
            200,
            "Booking history retrieved successfully.",
            history
        );

    } catch (error) {

        next(error);

    }

};