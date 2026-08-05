import express from "express";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";

import {
    initializePayment,
    mockPaymentCallback,
    refundPayment,
    getPaymentHistory,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
    "/initialize",
    protect,
    authorize(
    ROLES.PASSENGER,
    ROLES.DRIVER,
    ROLES.CORPORATE_ADMIN
),
    initializePayment
);

router.post(
    "/mock-callback/:reference",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    mockPaymentCallback
);

router.patch(
    "/refund/:reference",
    protect,
    authorize(ROLES.PLATFORM_ADMIN),
    refundPayment
);
router.get(
    "/history",
    protect,
    authorize(
    ROLES.PASSENGER,
    ROLES.DRIVER,
    ROLES.CORPORATE_ADMIN
),
    getPaymentHistory
);

export default router;