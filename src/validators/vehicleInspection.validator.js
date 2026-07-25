import { body } from "express-validator";

export const createVehicleInspectionValidator = [

    body("frontPhoto")
        .trim()
        .notEmpty()
        .withMessage("Front photo is required."),

    body("rearPhoto")
        .trim()
        .notEmpty()
        .withMessage("Rear photo is required."),

    body("dashboardPhoto")
        .trim()
        .notEmpty()
        .withMessage("Dashboard photo is required."),

    body("odometerPhoto")
        .trim()
        .notEmpty()
        .withMessage("Odometer photo is required."),

    body("tyrePhoto")
        .trim()
        .notEmpty()
        .withMessage("Tyre photo is required."),

    body("safetyEquipmentPhoto")
        .trim()
        .notEmpty()
        .withMessage("Safety equipment photo is required."),
];

export const updateVehicleInspectionValidator = [

    body("frontPhoto").optional(),

    body("rearPhoto").optional(),

    body("dashboardPhoto").optional(),

    body("odometerPhoto").optional(),

    body("tyrePhoto").optional(),

    body("safetyEquipmentPhoto").optional(),
];