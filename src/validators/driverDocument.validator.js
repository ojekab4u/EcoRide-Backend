import { body } from "express-validator";

export const uploadDriverDocumentsValidator = [

    body("nationalIdUrl")
        .trim()
        .notEmpty()
        .withMessage("National ID is required.")
        .isURL()
        .withMessage("National ID must be a valid URL."),

    body("driverLicenseUrl")
        .trim()
        .notEmpty()
        .withMessage("Driver license is required.")
        .isURL()
        .withMessage("Driver license must be a valid URL."),

    body("vehicleRegistrationUrl")
        .trim()
        .notEmpty()
        .withMessage("Vehicle registration is required.")
        .isURL()
        .withMessage("Vehicle registration must be a valid URL."),

    body("insuranceCertificateUrl")
        .trim()
        .notEmpty()
        .withMessage("Insurance certificate is required.")
        .isURL()
        .withMessage("Insurance certificate must be a valid URL."),

    body("selfieUrl")
        .trim()
        .notEmpty()
        .withMessage("Selfie is required.")
        .isURL()
        .withMessage("Selfie must be a valid URL."),
];

export const updateDriverDocumentsValidator = [

    body("nationalIdUrl")
        .optional()
        .isURL()
        .withMessage("National ID must be a valid URL."),

    body("driverLicenseUrl")
        .optional()
        .isURL()
        .withMessage("Driver license must be a valid URL."),

    body("vehicleRegistrationUrl")
        .optional()
        .isURL()
        .withMessage("Vehicle registration must be a valid URL."),

    body("insuranceCertificateUrl")
        .optional()
        .isURL()
        .withMessage("Insurance certificate must be a valid URL."),

    body("selfieUrl")
        .optional()
        .isURL()
        .withMessage("Selfie must be a valid URL."),
];