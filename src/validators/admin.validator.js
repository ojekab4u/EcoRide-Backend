import { body } from "express-validator";

export const reviewValidator = [

    body("status")
        .customSanitizer(value =>
            value?.trim().toUpperCase()
        )
        .isIn([
            "APPROVED",
            "REJECTED",
        ])
        .withMessage("Status must be APPROVED or REJECTED."),

    body("reason")
        .optional()
        .trim(),

];


export const updateUserRoleValidator = [

    body("role")
        .trim()
        .toUpperCase()
        .isIn([
            "PASSENGER",
            "DRIVER",
            "CORPORATE_ADMIN",
            "PLATFORM_ADMIN",
        ])
        .withMessage("Invalid role."),

];