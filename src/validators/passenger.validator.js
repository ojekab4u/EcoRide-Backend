import { body } from "express-validator";
import normalizeEnum from "../utils/normalizeEnum.js";

export const createPassengerProfileValidator = [

    body("gender")
        .notEmpty()
        .withMessage("Gender is required.")
        .customSanitizer(value => normalizeEnum(value))
        .isIn(["MALE", "FEMALE", "OTHER"])
        .withMessage("Invalid gender."),

    body("dateOfBirth")
        .notEmpty()
        .withMessage("Date of birth is required.")
        .isISO8601()
        .withMessage("Date of birth must be a valid date."),

    body("occupation")
        .optional()
        .trim(),

    body("homeLocation")
        .notEmpty()
        .withMessage("Home location is required.")
        .trim(),

    body("officeLocation")
        .optional()
        .trim(),
];

export const updatePassengerProfileValidator = [

    body("gender")
        .optional()
        .customSanitizer(value => normalizeEnum(value))
        .isIn(["MALE", "FEMALE", "OTHER"])
        .withMessage("Invalid gender."),

    body("dateOfBirth")
        .optional()
        .isISO8601()
        .withMessage("Date of birth must be a valid date."),

    body("occupation")
        .optional()
        .trim(),

    body("homeLocation")
        .optional()
        .trim(),

    body("officeLocation")
        .optional()
        .trim(),
];

export const emergencyContactValidator = [

    body("fullName")
        .notEmpty()
        .withMessage("Full name is required.")
        .trim(),

    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required.")
        .trim(),

    body("relationship")
        .notEmpty()
        .withMessage("Relationship is required.")
        .trim(),
];