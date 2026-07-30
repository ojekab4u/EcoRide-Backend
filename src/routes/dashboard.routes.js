import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    getDriverDashboard,
    getPassengerDashboard,
    getAdminDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
    "/driver",
    protect,
    authorize(ROLES.DRIVER),
    getDriverDashboard
);

router.get(
    "/passenger",
    protect,
    authorize(ROLES.PASSENGER),
    getPassengerDashboard
);

router.get(
    "/admin",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    getAdminDashboard
);

export default router;