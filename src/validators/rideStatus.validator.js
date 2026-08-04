import { body } from "express-validator";

export const acknowledgeArrivalValidator = [

    body("confirmed")
        .optional()
        .isBoolean()
        .withMessage("confirmed must be true or false."),

];