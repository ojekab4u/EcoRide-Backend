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