import { validationResult } from "express-validator";
import { MESSAGES } from "../constants/messages.js";

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const formattedErrors = {};

        errors.array().forEach((error) => {

            // Prevent duplicate messages for the same field
            if (!formattedErrors[error.path]) {
                formattedErrors[error.path] = error.msg;
            }

        });

        return res.status(400).json({
            success: false,
            message: MESSAGES.VALIDATION_FAILED,
            errors: formattedErrors,
        });

    }

    next();

};

export default validate;