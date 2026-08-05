import { body } from "express-validator";

export const createRatingValidator = [
    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5."),

    body("comment")
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage("Comment must not exceed 500 characters."),
];