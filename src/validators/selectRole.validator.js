import { body } from "express-validator";
import { ROLES } from "../constants/roles.js";

export const selectRoleValidator = [
    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required.")

        .customSanitizer((value) => value.toUpperCase())

        .isIn([
            ROLES.PASSENGER,
            ROLES.DRIVER,
            ROLES.CORPORATE_ADMIN,
        ])
        .withMessage("Invalid role."),
];