import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";

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

    upload.fields([
        { name: "nationalId", maxCount: 1 },
        { name: "driverLicense", maxCount: 1 },
        { name: "vehicleRegistration", maxCount: 1 },
        { name: "insuranceCertificate", maxCount: 1 },
        { name: "selfie", maxCount: 1 },
    ]),

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

    upload.fields([
        { name: "nationalId", maxCount: 1 },
        { name: "driverLicense", maxCount: 1 },
        { name: "vehicleRegistration", maxCount: 1 },
        { name: "insuranceCertificate", maxCount: 1 },
        { name: "selfie", maxCount: 1 },
    ]),

    updateDriverDocuments
);
export default router;