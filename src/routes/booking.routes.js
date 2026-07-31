import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    confirmBooking,
} from "../controllers/booking.controller.js";

import {
    createBookingValidator,
} from "../validators/booking.validator.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(ROLES.PASSENGER),
    createBookingValidator,
    validate,
    createBooking
);

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);

router.get(
    "/:id",
    protect,
    getBookingById
);

router.patch(
    "/:id/cancel",
    protect,
    cancelBooking
);

router.patch(
    "/:id/confirm",
    protect,
    authorize(ROLES.DRIVER),
    confirmBooking
);

export default router;