import {
    createCorporateProfileService,
    getCorporateProfileService,
    updateCorporateProfileService,
    getCorporateDashboardService
} from "../services/corporate.service.js";

import { successResponse }
from "../utils/response.js";


export const createCorporateProfile = async (
    req,
    res,
    next
) => {

    try {

        const profile =
            await createCorporateProfileService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Corporate profile created successfully.",
            profile
        );

    } catch (error) {

        next(error);

    }

};

export const getCorporateProfile = async (
    req,
    res,
    next
) => {

    try {

        const profile =
            await getCorporateProfileService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Corporate profile retrieved successfully.",
            profile
        );

    } catch (error) {

        next(error);

    }

};

export const updateCorporateProfile = async (
    req,
    res,
    next
) => {

    try {

        const profile =
            await updateCorporateProfileService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Corporate profile updated successfully.",
            profile
        );

    } catch (error) {

        next(error);

    }

};

export const getCorporateDashboard = async (
    req,
    res,
    next
) => {
    try {

        const dashboard =
            await getCorporateDashboardService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Corporate dashboard retrieved successfully.",
            dashboard
        );

    } catch (error) {
        next(error);
    }
};