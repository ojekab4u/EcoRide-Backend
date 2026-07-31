import {
    getDriverDashboardService,
    getPassengerDashboardService,
    getAdminDashboardService,
} from "../services/dashboard.service.js";

import { successResponse } from "../utils/response.js";

export const getDriverDashboard = async (req, res, next) => {
    try {
        
        const dashboard =
        await getDriverDashboardService(
        req.user.id
    );
        return successResponse(
            res,
            200,
            "Driver dashboard retrieved successfully.",
            dashboard
        );

    } catch (error) {
        next(error);
    }
};

export const getPassengerDashboard = async (req, res, next) => {
    try {

      const dashboard =
        await getPassengerDashboardService(
        req.user.id
    );
        return successResponse(
            res,
            200,
            "Passenger dashboard retrieved successfully.",
            dashboard
        );

    } catch (error) {
        next(error);
    }
};

export const getAdminDashboard = async (req, res, next) => {
    try {

        const dashboard =
            await getAdminDashboardService();

        return successResponse(
            res,
            200,
            "Admin dashboard retrieved successfully.",
            dashboard
        );

    } catch (error) {
        next(error);
    }
};