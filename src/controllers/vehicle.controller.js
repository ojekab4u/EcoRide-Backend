import {
    createVehicleService,
    getVehiclesService,
    getVehicleByIdService,
    updateVehicleService,
    deleteVehicleService,
} from "../services/vehicle.service.js";

import {successResponse} from "../utils/response.js";

export const createVehicle = async (req, res, next) => {
    try {
        const vehicle = await createVehicleService(
            req.user.id,
            req.body
        );
        return successResponse(
            res,
            201,
            "Vehicle registered successfully.",
            vehicle
        );
    } catch (error) {

        next(error);

    }

};

export const getVehicles = async (req, res, next) => {

    try {

        const vehicles = await getVehiclesService(
            req.user.id
        );

        return successResponse(
            res,
            200,
            "Vehicles retrieved successfully.",
            vehicles
        );
    } catch (error) {
        next(error);
    }
};

export const getVehicleById = async (req, res, next) => {
    try {
        const vehicle = await getVehicleByIdService(
            req.user.id,
            req.params.id
        );
        return successResponse(
            res,
            200,
            "Vehicle retrieved successfully.",
            vehicle
        );
    } catch (error) {

        next(error);

    }

};

export const updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await updateVehicleService(
            req.user.id,
            req.params.id,
            req.body
        );
        return successResponse(
            res,
            200,
            "Vehicle updated successfully.",
            vehicle
        );

    } catch (error) {

        next(error);

    }

};

export const deleteVehicle = async (req, res, next) => {
    try {

        await deleteVehicleService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Vehicle deleted successfully."
        );

    } catch (error) {

        next(error);

    }

};