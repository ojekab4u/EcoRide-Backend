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

  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Invalid role."),
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