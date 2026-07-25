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

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    createVehicleInspectionValidator,
    validate,
    createVehicleInspection
);

router.get(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    getVehicleInspection
);

router.patch(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    updateVehicleInspectionValidator,
    validate,
    updateVehicleInspection
);

export default router;