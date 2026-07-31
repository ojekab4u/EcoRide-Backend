import { body } from "express-validator";

export const createRideValidator = [

    body("pickupLocation")
        .trim()
        .notEmpty()
        .withMessage("Pickup location is required."),

    body("pickupLatitude")
        .isFloat()
        .withMessage("Pickup latitude is required."),

    body("pickupLongitude")
        .isFloat()
        .withMessage("Pickup longitude is required."),

    body("destination")
        .trim()
        .notEmpty()
        .withMessage("Destination is required."),

    body("destinationLatitude")
        .isFloat()
        .withMessage("Destination latitude is required."),

    body("destinationLongitude")
        .isFloat()
        .withMessage("Destination longitude is required."),

    body("departureTime")
        .isISO8601()
        .withMessage("Valid departure time is required."),

    body("availableSeats")
        .isInt({ min: 1 })
        .withMessage("Available seats must be at least 1."),

    body("pricePerSeat")
        .isFloat({ min: 0 })
        .withMessage("Price per seat must be greater than or equal to 0."),

];

export const updateRideValidator = [

    body("pickupLocation")
        .optional()
        .trim(),

    body("pickupLatitude")
        .optional()
        .isFloat(),

    body("pickupLongitude")
        .optional()
        .isFloat(),

    body("destination")
        .optional()
        .trim(),

    body("destinationLatitude")
        .optional()
        .isFloat(),

    body("destinationLongitude")
        .optional()
        .isFloat(),

    body("departureTime")
        .optional()
        .isISO8601(),

    body("availableSeats")
        .optional()
        .isInt({ min: 1 }),

    body("pricePerSeat")
        .optional()
        .isFloat({ min: 0 }),

];