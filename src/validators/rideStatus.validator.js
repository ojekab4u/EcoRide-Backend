import { body } from "express-validator";

export const acknowledgeArrivalValidator = [

    body("accepted")
        .optional()
        .isBoolean()
        .withMessage("accepted must be true or false."),

];