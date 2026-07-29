import { body } from "express-validator";

export const sendOTPValidator = [

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

];

export const verifyOTPValidator = [

    body("email")
        .isEmail(),

    body("code")
    .matches(/^\d{4}$/)
    .withMessage("OTP must be 4 digits")

];


export const sendPhoneOTPValidator = [
    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required.")
];

export const verifyPhoneOTPValidator = [
    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required."),

    body("code")
        .isLength({ min: 4, max: 4 })
        .withMessage("OTP must be 4 digits.")
];

