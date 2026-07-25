import {
    createDriverProfileService,
    getDriverProfileService,
    updateDriverProfileService,
} from "../services/driver.service.js";

import { successResponse } from "../utils/response.js";

export const createDriverProfile = async (req, res, next) => {

    try {

        const driver = await createDriverProfileService(
            req.user.id,
            req.body
        );

        return successResponse(
            res,
            201,
            "Driver profile created successfully.",
            driver
        );

    } catch (error) {
        next(error);
    }
};

export const getDriverProfile = async (req, res, next) => {

    try {

        const driver = await getDriverProfileService(
            req.user.id
        );

        return successResponse(
            res,
            200,
            "Driver profile retrieved successfully.",
            driver
        );

    } catch (error) {
        next(error);
    }
};

export const updateDriverProfile = async (
    req,
    res,
    next
) => {
    try {

        const driver = await updateDriverProfileService(
            req.user.id,
            req.body
        );

        return successResponse(
            res,
            200,
            "Driver profile updated successfully.",
            driver
        );

    } catch (error) {
        next(error);
    }
};