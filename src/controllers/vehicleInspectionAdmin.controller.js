import {
    getAllInspectionsForReviewService,
    getInspectionForReviewService,
    reviewInspectionService,
} from "../services/vehicleInspectionAdmin.service.js";

import { successResponse } from "../utils/response.js";

export const getAllInspectionsForReview = async (
    req,
    res,
    next
) => {

    try {

        const inspections =
            await getAllInspectionsForReviewService();

        return successResponse(
            res,
            200,
            "Vehicle inspections retrieved successfully.",
            inspections
        );

    } catch (error) {

        next(error);

    }

};

export const getInspectionForReview = async (
    req,
    res,
    next
) => {

    try {

        const inspection =
            await getInspectionForReviewService(
                req.params.id
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

export const reviewInspection = async (
    req,
    res,
    next
) => {

    try {

        const inspection =
            await reviewInspectionService(
                req.params.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Vehicle inspection reviewed successfully.",
            inspection
        );

    } catch (error) {

        next(error);

    }

};