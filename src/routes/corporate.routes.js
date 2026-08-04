import express from "express";
import upload from "../middlewares/upload.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createCorporateProfile,
    getCorporateProfile,
    updateCorporateProfile,
    getCorporateDashboard,
} from "../controllers/corporate.controller.js";

import {
    corporateProfileValidator,

} from "../validators/corporate.validator.js";

import {updateCorporateDocuments,
    getCorporateDocuments,
    uploadCorporateDocuments,
 } from "../controllers/corporateDocument.controller.js"

const router = express.Router();

router.post(
    "/profile",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    corporateProfileValidator,
    validate,
    createCorporateProfile

);

router.get(
    "/profile",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    getCorporateProfile

);

router.patch(
    "/profile",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    corporateProfileValidator,
    validate,
    updateCorporateProfile
);

router.post(
    "/documents",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    upload.fields([
        { name: "cacCertificate", maxCount: 1 },
        { name: "taxCertificate", maxCount: 1 },
        { name: "businessLicense", maxCount: 1 },
    ]),
    uploadCorporateDocuments
);

router.get(
    "/documents",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    getCorporateDocuments
);

router.patch(
    "/documents",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    upload.fields([
        { name: "cacCertificate", maxCount: 1 },
        { name: "taxCertificate", maxCount: 1 },
        { name: "businessLicense", maxCount: 1 },
    ]),
    updateCorporateDocuments
);

router.get(
    "/dashboard",
    protect,
    authorize(ROLES.CORPORATE_ADMIN),
    getCorporateDashboard
);
export default router;