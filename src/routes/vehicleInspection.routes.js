import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createVehicleInspection,
    getVehicleInspection,
    updateVehicleInspection,
} from "../controllers/vehicleInspection.controller.js";

import {
    createVehicleInspectionValidator,
    updateVehicleInspectionValidator,
} from "../validators/vehicleInspection.validator.js";

import upload from "../middlewares/upload.middleware.js";
const router = express.Router();


router.post(
    "/:vehicleId",
    protect,
    authorize(ROLES.DRIVER),

    upload.fields([
        { name: "frontPhoto", maxCount: 1 },
        { name: "rearPhoto", maxCount: 1 },
        { name: "dashboardPhoto", maxCount: 1 },
        { name: "odometerPhoto", maxCount: 1 },
        { name: "tyrePhoto", maxCount: 1 },
        { name: "safetyEquipmentPhoto", maxCount: 1 },
    ]),

    createVehicleInspection
);

router.patch(
    "/:vehicleId",
    protect,
    authorize(ROLES.DRIVER),

    upload.fields([
        { name: "frontPhoto", maxCount: 1 },
        { name: "rearPhoto", maxCount: 1 },
        { name: "dashboardPhoto", maxCount: 1 },
        { name: "odometerPhoto", maxCount: 1 },
        { name: "tyrePhoto", maxCount: 1 },
        { name: "safetyEquipmentPhoto", maxCount: 1 },
    ]),

    updateVehicleInspection
);


router.get(
    "/:vehicleId",
    protect,
    authorize(ROLES.DRIVER),
    getVehicleInspection
);



export default router;