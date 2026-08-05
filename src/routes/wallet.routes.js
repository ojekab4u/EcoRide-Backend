import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    getWallet,
    getWalletTransactions,
} from "../controllers/wallet.controller.js";

const router = express.Router();

router.get(
    "/",
    protect,
    authorize(
        ROLES.PASSENGER,
        ROLES.DRIVER,
        ROLES.CORPORATE_ADMIN
    ),
    getWallet

);

router.get(
    "/transactions",
    protect,
    authorize(
        ROLES.PASSENGER,
        ROLES.DRIVER,
        ROLES.CORPORATE_ADMIN
    ),
    getWalletTransactions
);

export default router;