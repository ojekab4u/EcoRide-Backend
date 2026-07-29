import User from "../models/user.model.js"

import {
    getProfile,
    updateProfile,
} from "../services/user.service.js";

import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.js";


export const registerUser = async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};



export const getMyProfile = async (
    req,
    res,
    next
) => {

    try {

        const user = await getProfile(req.user.id);

        return successResponse(
            res,
            200,
            MESSAGES.PROFILE_FETCHED,
            user
        );

    } catch (error) {

        next(error);

    }

};

export const updateMyProfile = async (
    req,
    res,
    next
) => {

    try {

        const user = await updateProfile(
            req.user.id,
            req.body
        );

        return successResponse(
            res,
            200,
            MESSAGES.PROFILE_UPDATED,
            user
        );

    } catch (error) {

        next(error);

    }

};