import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    uploadDriverDocuments,
    getDriverDocuments,
    updateDriverDocuments,
} from "../controllers/driverDocument.controller.js";

import {
    uploadDriverDocumentsValidator,
    updateDriverDocumentsValidator,
} from "../validators/driverDocument.validator.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    uploadDriverDocumentsValidator,
    validate,
    uploadDriverDocuments
);

router.get(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    getDriverDocuments
);

router.patch(
    "/",
    protect,
    authorize(ROLES.DRIVER),
    updateDriverDocumentsValidator,
    validate,
    updateDriverDocuments
);

export default router;