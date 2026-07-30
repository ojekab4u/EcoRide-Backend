

import {
    getDriverEarningsService,
    getEarningHistoryService,
    getEarningSummaryService,
} from "../services/earning.service.js";

import { successResponse } from "../utils/response.js";

export const getDriverEarnings = async (
    req,
    res,
    next
) => {
    try {

        const earnings =
            await getDriverEarningsService();

        return successResponse(
            res,
            200,
            "Driver earnings retrieved successfully.",
            earnings
        );

    } catch (error) {
        next(error);
    }
};

export const getEarningHistory = async (
    req,
    res,
    next
) => {
    try {

        const history =
            await getEarningHistoryService();

        return successResponse(
            res,
            200,
            "Earning history retrieved successfully.",
            history
        );

    } catch (error) {
        next(error);
    }
};

export const getEarningSummary = async (
    req,
    res,
    next
) => {
    try {

        const summary =
            await getEarningSummaryService();

        return successResponse(
            res,
            200,
            "Earning summary retrieved successfully.",
            summary
        );

    } catch (error) {
        next(error);
    }
};