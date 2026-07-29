import { body } from "express-validator";

export const createDriverProfileValidator = [

    body("licenseNumber")
        .trim()
        .notEmpty()
        .withMessage("License number is required."),

    body("licenseExpiry")
        .notEmpty()
        .withMessage("License expiry date is required.")
        .isISO8601()
        .withMessage("License expiry must be a valid date."),

    body("yearsOfExperience")
        .notEmpty()
        .withMessage("Years of experience is required.")
        .isInt({ min: 0 })
        .withMessage("Years of experience must be a positive number."),

    body("preferredVehicleType")
        .optional()
         .customSanitizer(value =>
        value?.trim().toUpperCase())
        .isIn([
            "SEDAN",
            "SUV",
            "MINIBUS",
            "TRUCK",
            "BIKE",
        ])
        .withMessage("Invalid vehicle type."),
];

export const updateDriverProfileValidator = [

    body("licenseNumber").optional(),

    body("licenseExpiry")
        .optional()
        .isISO8601()
        .withMessage("License expiry must be a valid date."),

    body("yearsOfExperience")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Years of experience must be a positive number."),

    body("preferredVehicleType")
        .optional()
         .customSanitizer(value =>
        value?.trim().toUpperCase())
        .isIn([
            "SEDAN",
            "SUV",
            "MINIBUS",
            "TRUCK",
            "BIKE",
        ])
        .withMessage("Invalid vehicle type."),
];