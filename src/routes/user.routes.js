import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
    getMyProfile,
    updateMyProfile,
} from "../controllers/user.controller.js";

import {
    updateProfileValidator,
} from "../validators/user.validator.js";

const router = Router();

router.get(
    "/profile",
    protect,
    getMyProfile
);

router.patch(
    "/profile",
    protect,
    updateProfileValidator,
    validate,
    updateMyProfile
);

export default router;