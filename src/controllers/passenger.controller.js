import {
    createPassengerProfileService,
    getPassengerProfileService,
    updatePassengerProfileService,
    createEmergencyContactService,
} from "../services/passenger.service.js";

import { successResponse } from "../utils/response.js";

export const createPassengerProfile = async (
    req,
    res,
    next
) => {

    try {

        const profile =
            await createPassengerProfileService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Passenger profile created successfully.",
            profile
        );

    } catch (error) {
        next(error);
    }

};

export const getPassengerProfile = async (
    req,
    res,
    next
) => {

    try {

        const profile =
            await getPassengerProfileService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Passenger profile retrieved successfully.",
            profile
        );

    } catch (error) {
        next(error);
    }

};

export const updatePassengerProfile = async (
    req,
    res,
    next
) => {

    try {

        const profile =
            await updatePassengerProfileService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Passenger profile updated successfully.",
            profile
        );

    } catch (error) {
        next(error);
    }

};

export const createEmergencyContact = async (
    req,
    res,
    next
) => {

    try {

        const contact =
            await createEmergencyContactService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Emergency contact created successfully.",
            contact
        );

    } catch (error) {
        next(error);
    }

};