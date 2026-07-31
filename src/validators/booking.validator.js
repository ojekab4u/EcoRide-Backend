import { body } from "express-validator";

export const createBookingValidator = [

    body("rideId")
        .notEmpty()
        .withMessage("Ride ID is required."),

    body("numberOfSeats")
        .isInt({ min: 1 })
        .withMessage("Number of seats must be at least 1."),

];