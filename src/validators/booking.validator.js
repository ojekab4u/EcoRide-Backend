import { body } from "express-validator";


export const createBookingValidator = [

    body("rideId")
        .notEmpty()
        .withMessage("Ride ID is required."),

    body("numberOfSeats")
        .isInt({ min: 1 })
        .withMessage("Number of seats must be at least 1."),

    body("isRecurring")
        .optional()
        .isBoolean(),

    body("travelDate")
        .if(body("isRecurring").equals("false"))
        .notEmpty()
        .withMessage("Travel date is required.")
        .isISO8601()
        .withMessage("Travel date must be valid."),

    body("recurrenceDays")
        .if(body("isRecurring").equals("true"))
        .isArray({ min: 1 })
        .withMessage("Select at least one recurrence day."),

    body("recurrenceStartDate")
        .if(body("isRecurring").equals("true"))
        .isISO8601()
        .withMessage("Recurring start date is required."),

    body("recurrenceEndDate")
        .if(body("isRecurring").equals("true"))
        .isISO8601()
        .withMessage("Recurring end date is required."),
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