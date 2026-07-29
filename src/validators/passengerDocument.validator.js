import { body } from "express-validator";

export const uploadPassengerDocumentValidator = [

    body("nationalIdFront")
        .optional()
        .isURL()
        .withMessage("National ID front must be a valid URL."),

    body("nationalIdBack")
        .optional()
        .isURL()
        .withMessage("National ID back must be a valid URL."),

    body("selfie")
        .optional()
        .isURL()
        .withMessage("Selfie must be a valid URL."),

];