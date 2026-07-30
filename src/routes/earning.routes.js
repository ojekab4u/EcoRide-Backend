import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    getDriverEarnings,
    getEarningHistory,
    getEarningSummary,
} from "../controllers/earning.controller.js";

const router = express.Router();

router.get(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    getDriverEarnings
);

router.get(
    "/history",
    protect,
    authorize(ROLES.DRIVER),
    getEarningHistory
);

router.get(
    "/summary",
    protect,
    authorize(ROLES.DRIVER),
    getEarningSummary
);

export default router;