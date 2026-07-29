import { body } from "express-validator";
import { INSPECTION_STATUS } from "../constants/inspectionStatus.js";

export const createVehicleInspectionValidator = [

     body("status")
        .customSanitizer(value => value?.trim().toUpperCase())
        .isIn(Object.values(INSPECTION_STATUS))
        .withMessage("Invalid inspection status."),

    body("reviewNote")
        .optional()
        .trim(),
];

export const updateVehicleInspectionValidator = [

    // body("frontPhoto").optional(),

    // body("rearPhoto").optional(),

    // body("dashboardPhoto").optional(),

    // body("odometerPhoto").optional(),

    // body("tyrePhoto").optional(),

    // body("safetyEquipmentPhoto").optional(),
];