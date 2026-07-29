import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    uploadPassengerDocument,
    getPassengerDocument,
} from "../controllers/passengerDocument.controller.js";

import {
    uploadPassengerDocumentValidator,
} from "../validators/passengerDocument.validator.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.PASSENGER),
    uploadPassengerDocumentValidator,
    validate,
    uploadPassengerDocument
);

router.get(
    "/",
    protect,
    authorize(ROLES.PASSENGER),
    getPassengerDocument
);

export default router;