import express from "express";

import { ROLES } from "../constants/roles.js";
import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import {
    createDriverProfile,
    getDriverProfile,
    updateDriverProfile,
} from "../controllers/driver.controller.js";

import {
    createDriverProfileValidator,
    updateDriverProfileValidator,
} from "../validators/driver.validator.js";



const router = express.Router();

router.post(
    "/profile",
    protect,
    authorize(ROLES.DRIVER),
    createDriverProfileValidator,
    validate,
    createDriverProfile
);

router.get(
    "/profile",
    protect,
    authorize(ROLES.DRIVER),
    getDriverProfile
);
router.patch(
    "/profile",
    protect,
    updateDriverProfileValidator,
    validate,
    updateDriverProfile
);

export default router;