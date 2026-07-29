import {
    sendEmailOTPService,
    verifyEmailOTPService,
    sendPhoneOTPService,
    verifyPhoneOTPService,
} from "../services/otp.service.js";

import { successResponse } from "../utils/response.js";

export const sendEmailOTP = async (
    req,
    res,
    next
) => {

    try {

        await sendEmailOTPService(req.body.email);

        return successResponse(
            res,
            200,
            "OTP sent successfully."
        );

    } catch (error) {
        next(error);
    }

};

export const verifyEmailOTP = async (
    req,
    res,
    next
) => {

    try {

        await verifyEmailOTPService(
            req.body.email,
            req.body.code
        );

        return successResponse(
            res,
            200,
            "Email verified successfully."
        );
    } catch (error) {
        next(error);
    }
};

export const sendPhoneOTP = async (
    req,
    res,
    next
) => {

    try {

        await sendPhoneOTPService(
            req.body.phoneNumber
        );

        return successResponse(
            res,
            200,
            "Phone OTP sent successfully."
        );

    } catch (error) {

        next(error);

    }

};


export const verifyPhoneOTP = async (
    req,
    res,
    next
) => {
    try {
        await verifyPhoneOTPService(
            req.body.phoneNumber,
            req.body.code
        );

        return successResponse(
            res,
            200,
            "Phone verified successfully."
        );

    } catch (error) {
        next(error);
    }
};
