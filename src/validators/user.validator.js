import { body } from "express-validator";

export const updateProfileValidator = [

    body("firstName")
        .optional()
        .trim()
        .notEmpty(),

    body("lastName")
        .optional()
        .trim()
        .notEmpty(),

    body("phoneNumber")
        .optional()
        .trim()
        .notEmpty(),

    body("profilePicture")
        .optional()
        .isString(),

];