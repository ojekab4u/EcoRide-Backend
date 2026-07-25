import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} from "../controllers/vehicle.controller.js";

import {
    createVehicleValidator,
    updateVehicleValidator,
} from "../validators/vehicle.validator.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    createVehicleValidator,
    validate,
    createVehicle
);

router.get(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    getVehicles
);

router.get(
    "/:id",
    protect,
    authorize(ROLES.DRIVER),
    getVehicleById
);

router.patch(
    "/:id",
    protect,
    authorize(ROLES.DRIVER),
    updateVehicleValidator,
    validate,
    updateVehicle
);

router.delete(
    "/:id",
    protect,
    authorize(ROLES.DRIVER),
    deleteVehicle
);

export default router;