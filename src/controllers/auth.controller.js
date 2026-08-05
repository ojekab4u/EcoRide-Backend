import { registerUser, loginUser, changePassword } from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.js";
import {forgotPasswordService, resetPasswordService,}  from "../services/auth.service.js"
export const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const changeUserPassword = async (
    req,
    res,
    next
) => {

    try {

        await changePassword(
            req.user.id,
            req.body
        );

        return successResponse(
            res,
            200,
            MESSAGES.CHANGE_PASSWORD_SUCCESS
        );

    } catch (error) {

        next(error);

    }

};


export const forgotPassword = async (req, res,next) => {

    try {
        await forgotPasswordService(req.body.email);

        return successResponse(
            res,
            200,
            MESSAGES.FORGOT_PASSWORD_SUCCESS
        );

    } catch (error) {

        next(error);

    }

};

export const resetPassword = async (
    req,
    res,
    next
) => {

    try {

        await resetPasswordService(
            req.params.token,
            req.body
        );

        return successResponse(
            res,
            200,
            MESSAGES.RESET_PASSWORD_SUCCESS
        );

    } catch (error) {

        next(error);

    }

};


export const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
};