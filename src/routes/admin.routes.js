import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    reviewDriverProfile,
    getUsers,
    updateUserRole,
    getDriverDetails,
    getPassengerDetails,
    getDrivers,
    getPassengers,
    reviewPassengerProfile
} from "../controllers/admin.controller.js";

import {
    reviewVehicle,
    getAllVehiclesForReview,
    getVehicleForReview,
} from "../controllers/vehicleAdmin.controller.js";

import {
    reviewValidator,
    updateUserRoleValidator,
} from "../validators/admin.validator.js";
import {
    getAllInspectionsForReview,
    getInspectionForReview,
    reviewInspection,
} from "../controllers/vehicleInspectionAdmin.controller.js";

import {reviewInspectionValidator} from "../validators/vehicleInspection.validator.js"


const router = express.Router();


// DRIVER REVIEW
router.get(
    "/drivers",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getDrivers
);

router.get(
    "/drivers/:driverId",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getDriverDetails
);
router.patch(
    "/drivers/:driverId",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    reviewValidator,
    validate,
    reviewDriverProfile
);

// PASSENGER REVIEW
router.get(
    "/passengers",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getPassengers
);

router.get(
    "/passengers/:passengerId",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getPassengerDetails
);

router.patch(
    "/passengers/:passengerId",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    reviewValidator,
    validate,
    reviewPassengerProfile
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

router.patch(
    "/users/:id/role",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    updateUserRoleValidator,
    validate,
    updateUserRole
);

export default router;