import express from "express";

import validate from "../middlewares/validate.middleware.js";

import {
    sendEmailOTP,
    verifyEmailOTP,
    sendPhoneOTP,
    verifyPhoneOTP
} from "../controllers/otp.controller.js";

import {
    sendOTPValidator,
    verifyOTPValidator,
    sendPhoneOTPValidator,
    verifyPhoneOTPValidator,
} from "../validators/otp.validator.js";

const router = express.Router();

router.post(
    "/send-email",
    sendOTPValidator,
    validate,
    sendEmailOTP
);

router.post(
    "/verify-email",
    verifyOTPValidator,
    validate,
    verifyEmailOTP
);

router.post(
    "/send-phone",
    sendPhoneOTPValidator,
    validate,
    sendPhoneOTP
);

router.post(
    "/verify-phone",
    verifyPhoneOTPValidator,
    validate,
    verifyPhoneOTP
);

export default router;