import { body } from "express-validator";

export const createVehicleValidator = [

    body("brand")
        .trim()
        .notEmpty()
        .withMessage("Vehicle brand is required."),

    body("model")
        .trim()
        .notEmpty()
        .withMessage("Vehicle model is required."),

    body("year")
        .isInt({
            min: 1990,
            max: new Date().getFullYear() + 1,
        })
        .withMessage("Enter a valid vehicle year."),

    body("color")
        .trim()
        .notEmpty()
        .withMessage("Vehicle color is required."),

    body("plateNumber")
        .trim()
        .notEmpty()
        .withMessage("Plate number is required."),

    body("vehicleType")
        .customSanitizer(value => value?.trim().toUpperCase())
        .isIn([
            "SEDAN",
            "SUV",
            "MINIBUS",
            "TRUCK",
            "BIKE",
        ])
        .withMessage("Invalid vehicle type."),

    body("seatCapacity")
        .isInt({
            min: 1,
            max: 80,
        })
        .withMessage("Seat capacity must be between 1 and 80."),
];

export const updateVehicleValidator = [

    body("brand").optional().trim(),

    body("model").optional().trim(),

    body("year")
        .optional()
        .isInt({
            min: 1990,
            max: new Date().getFullYear() + 1,
        })
        .withMessage("Enter a valid vehicle year."),

    body("color").optional().trim(),

    body("plateNumber").optional().trim(),

    body("vehicleType")
    .customSanitizer(value =>
        value?.trim().toUpperCase()
    )
    .isIn([
        "SEDAN",
        "SUV",
        "MINIBUS",
        "TRUCK",
        "BIKE",
    ])
    .withMessage("Invalid vehicle type."),

    body("seatCapacity")
        .optional()
        .isInt({
            min: 1,
            max: 80,
        })
        .withMessage("Seat capacity must be between 1 and 80."),
];