import { body } from "express-validator";

export const corporateProfileValidator = [

    body("companyName")
        .trim()
        .notEmpty()
        .withMessage(
            "Company name is required."
        ),

    body("rcNumber")
        .trim()
        .notEmpty()
        .withMessage(
            "RC number is required."
        ),

    body("companyPhone")
        .trim()
        .notEmpty()
        .withMessage(
            "Company phone is required."
        ),

    body("companyAddress")
        .trim()
        .notEmpty()
        .withMessage(
            "Company address is required."
        ),

    body("industry")
        .optional()
        .trim(),

];