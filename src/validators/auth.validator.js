import { body } from "express-validator";
import { ROLES } from "../constants/roles.js";

export const registerValidator = [

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters."),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("phoneNumber")
    .trim()
    .matches(/^(\+234|0)[789][01]\d{8}$/)
    .withMessage("Invalid Nigerian phone number."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain a special character."),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

];


export const loginValidator = [

  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Email or phone number is required."),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];


export const changePasswordValidator = [

    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required."),

    body("newPassword")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain an uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password must contain a lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain a number."),

    body("confirmPassword")
        .custom((value, { req }) => {

            if (value !== req.body.newPassword) {
                throw new Error("Passwords do not match.");
            }

            return true;

        }),

    body("newPassword")
        .custom((value, { req }) => {

            if (value === req.body.currentPassword) {
                throw new Error(
                    "New password must be different from current password."
                );
            }

            return true;

        }),

];

export const forgotPasswordValidator = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")

        .isEmail()
        .withMessage("Please provide a valid email address.")

];

export const resetPasswordValidator = [

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required.")

        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Confirm password is required.")

        .custom((value, { req }) => {

            if (value !== req.body.newPassword) {
                throw new Error("Passwords do not match.");
            }

            return true;

        }),

];