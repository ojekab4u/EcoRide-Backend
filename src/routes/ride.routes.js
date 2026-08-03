import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createRide,
    getAllRides,
    getRideById,
    updateRide,
    deleteRide,
    completeRide,
    cancelRide,
    startRide,
    getDriverRideHistory,
    searchRides,
    driverArrived,
    getRideLocation,
    updateRideLocation,
} from "../controllers/ride.controller.js";

import {
    createRideValidator,
    updateRideValidator,
    updateRideLocationValidator,
} from "../validators/ride.validator.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    createRideValidator,
    validate,
    createRide
);

router.get("/", getAllRides);
router.get(
    "/history/me",
    protect,
    authorize(ROLES.DRIVER),
    getDriverRideHistory
);
router.get(
    "/search",
    protect,
    authorize(ROLES.PASSENGER),
    searchRides
);
router.get(
    "/:id",
    protect,    
    getRideById
);

router.patch(
    "/:id",
    protect,
    authorize(ROLES.DRIVER),
    updateRideValidator,
    validate,
    updateRide
);

router.delete(
    "/:id",
    protect,
    authorize(ROLES.DRIVER),
    deleteRide
);



router.patch(
    "/:id/cancel",
    protect,
    authorize(ROLES.DRIVER),
    cancelRide
);
router.patch(
    "/:id/arrive",
    protect,
    authorize(ROLES.DRIVER),
    driverArrived
);

router.patch(
    "/:id/start",
    protect,
    authorize(ROLES.DRIVER),
    startRide
);

router.patch(
    "/:id/complete",
    protect,
    authorize(ROLES.DRIVER),
    completeRide
);
router.patch(
    "/:id/location",
    protect,
    authorize(ROLES.DRIVER),
    updateRideLocationValidator,
    validate,
    updateRideLocation
);
router.get(
    "/:id/location",
    protect,
    authorize(ROLES.PASSENGER),
    getRideLocation
);
export default router;