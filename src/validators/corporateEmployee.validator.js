
import { body } from "express-validator";

export const createEmployeeValidator = [

    body("userId")
        .notEmpty()
        .isUUID(),

    body("department")
        .optional()
        .isString(),

    body("employeeId")
        .optional()
        .isString(),

    body("position")
        .optional()
        .isString(),

];

export const updateEmployeeValidator = [

    body("department")
        .optional()
        .isString(),

    body("employeeId")
        .optional()
        .isString(),

    body("position")
        .optional()
        .isString(),

    body("status")
        .optional()
        .isIn([
            "ACTIVE",
            "INACTIVE",
        ]),

];