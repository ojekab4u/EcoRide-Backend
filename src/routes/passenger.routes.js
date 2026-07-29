import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createPassengerProfile,
    getPassengerProfile,
    updatePassengerProfile,
    createEmergencyContact,
} from "../controllers/passenger.controller.js";

import {
    createPassengerProfileValidator,
    updatePassengerProfileValidator,
    emergencyContactValidator,
} from "../validators/passenger.validator.js";

const router = express.Router();

router.post(
    "/profile",
    protect,
    authorize(ROLES.PASSENGER),
    createPassengerProfileValidator,
    validate,
    createPassengerProfile
);

router.get(
    "/profile",
    protect,
    authorize(ROLES.PASSENGER),
    getPassengerProfile
);

router.patch(
    "/profile",
    protect,
    authorize(ROLES.PASSENGER),
    updatePassengerProfileValidator,
    validate,
    updatePassengerProfile
);

router.post(
    "/emergency-contact",
    protect,
    authorize(ROLES.PASSENGER),
    emergencyContactValidator,
    validate,
    createEmergencyContact
);

export default router;