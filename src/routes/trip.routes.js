import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    requestTrip,
    getTrips,
    getTripById,
    acceptTrip,
    rejectTrip,
    arriveTrip,
    startTrip,
    completeTrip,
    cancelTrip,
} from "../controllers/trip.controller.js";


const router = express.Router();

// Passenger
router.post(
    "/",
    protect,
    authorize(ROLES.PASSENGER),
    requestTrip
);

router.get(
    "/",
    protect,
    getTrips
);

router.get(
    "/:id",
    protect,
    getTripById
);

router.patch(
    "/:id/cancel",
    protect,
    cancelTrip
);

// Driver
router.patch(
    "/:id/accept",
    protect,
    authorize(ROLES.DRIVER),
    acceptTrip
);

router.patch(
    "/:id/reject",
    protect,
    authorize(ROLES.DRIVER),
    rejectTrip
);

router.patch(
    "/:id/arrive",
    protect,
    authorize(ROLES.DRIVER),
    arriveTrip
);

router.patch(
    "/:id/start",
    protect,
    authorize(ROLES.DRIVER),
    startTrip
);

router.patch(
    "/:id/complete",
    protect,
    authorize(ROLES.DRIVER),
    completeTrip
);

export default router;