import {
    reviewVehicleService,
    getAllVehiclesForReviewService,
    getVehicleForReviewService,
} from "../services/vehicleAdmin.service.js";

import { successResponse } from "../utils/response.js";

export const reviewVehicle = async (
    req,
    res,
    next
) => {

    try {

        const vehicle =
            await reviewVehicleService(
                req.params.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Vehicle reviewed successfully.",
            vehicle
        );

    } catch (error) {

        next(error);

    }

};

export const getAllVehiclesForReview =
async (req, res, next) => {

    try {

        const {
            page,
            limit,
            status,
        } = req.query;

        const vehicles =
            await getAllVehiclesForReviewService(
                page,
                limit,
                status
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

export const getVehicleForReview =
async(req,res,next)=>{

    try{

        const vehicle =
        await getVehicleForReviewService(
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Vehicle retrieved successfully.",
            vehicle
        );

    }catch(error){

        next(error);

    }

};