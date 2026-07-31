import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    uploadPassengerDocument,
    getPassengerDocument,
    updatePassengerDocument,
} from "../controllers/passengerDocument.controller.js";

import {
    uploadPassengerDocumentValidator,
} from "../validators/passengerDocument.validator.js";
import upload from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.PASSENGER),

    upload.fields([
        { name: "nationalIdFront", maxCount: 1 },
        { name: "nationalIdBack", maxCount: 1 },
        { name: "selfie", maxCount: 1 },
    ]),

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

router.patch(
    "/",
    protect,
    authorize(ROLES.PASSENGER),

    upload.fields([
        { name: "nationalIdFront", maxCount: 1 },
        { name: "nationalIdBack", maxCount: 1 },
        { name: "selfie", maxCount: 1 },
    ]),

    updatePassengerDocument
);
export default router;