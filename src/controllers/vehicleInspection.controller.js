import {
    createVehicleInspectionService,
    getVehicleInspectionService,
    updateVehicleInspectionService,
} from "../services/vehicleInspection.service.js";

import { successResponse } from "../utils/response.js";

export const createVehicleInspection = async (req, res, next) => {
    try {

        const inspection =
            await createVehicleInspectionService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Vehicle inspection submitted successfully.",
            inspection
        );

    } catch (error) {
        next(error);
    }
};

export const getVehicleInspection = async (req, res, next) => {
    try {

        const inspection =
            await getVehicleInspectionService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Vehicle inspection retrieved successfully.",
            inspection
        );

    } catch (error) {
        next(error);
    }
};

export const updateVehicleInspection = async (req, res, next) => {
    try {

        const inspection =
            await updateVehicleInspectionService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Vehicle inspection updated successfully.",
            inspection
        );

    } catch (error) {
        next(error);
    }
};