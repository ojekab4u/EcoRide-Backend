import { body } from "express-validator";

export const createBookingValidator = [

    body("rideId")
        .notEmpty()
        .withMessage("Ride ID is required."),

    body("numberOfSeats")
        .isInt({ min: 1 })
        .withMessage("Number of seats must be at least 1."),

];

export const cancelBookingValidator = [

    body("reason")
        .optional()
        .trim(),

];


export const rejectBookingValidator = [

    body("reason")
        .trim()
        .notEmpty()
        .withMessage("Rejection reason is required."),

];