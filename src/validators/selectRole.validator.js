import { body } from "express-validator";
import { ROLES } from "../constants/roles.js";

export const selectRoleValidator = [
    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required.")

        .customSanitizer((value) => value.toUpperCase())

         .isIn([
            "DRIVER",
            "PASSENGER",
            "CORPORATE_ADMIN",
        ])
        .withMessage(
            "Role must be DRIVER or PASSENGER."
        ),

];