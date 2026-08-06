import { getAdminDashboardService } from "../services/adminAnalytics.service.js";
import { successResponse } from "../utils/response.js";


export const getAdminDashboard = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await getAdminDashboardService();

        return successResponse(
            res,
            200,
            "Admin dashboard retrieved successfully.",
            data
        );

    } catch (error) {

        next(error);

    }

};