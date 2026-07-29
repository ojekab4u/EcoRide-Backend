import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    reviewDriverProfile,
    getUsers,
} from "../controllers/admin.controller.js";

import {
    reviewVehicle,
    getAllVehiclesForReview,
    getVehicleForReview,
} from "../controllers/vehicleAdmin.controller.js";

import {
    reviewValidator,
} from "../validators/admin.validator.js";
import {
    getAllInspectionsForReview,
    getInspectionForReview,
    reviewInspection,
} from "../controllers/vehicleInspectionAdmin.controller.js";

import {reviewInspectionValidator} from "../validators/vehicleInspection.validator.js"

const router = express.Router();


// DRIVER REVIEW

router.patch(
    "/drivers/:driverId",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    reviewValidator,
    validate,
    reviewDriverProfile
);


// VEHICLE REVIEW

router.get(
    "/vehicles",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getAllVehiclesForReview
);

router.get(
    "/vehicles/:id",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getVehicleForReview
);

router.patch(
    "/vehicles/:id",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    reviewValidator,
    validate,
    reviewVehicle
);


// INSPECTION REVEW

router.get(
    "/inspections",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getAllInspectionsForReview
);

router.get(
    "/inspections/:id",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getInspectionForReview
);

router.patch(
    "/inspections/:id",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    // reviewValidator,
    reviewInspectionValidator,
    validate,
    reviewInspection
);

router.get(
    "/users",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getUsers
);

export default router;