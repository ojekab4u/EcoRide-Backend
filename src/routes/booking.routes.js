import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    createBooking,
    getBookings,
    getBookingById,
    cancelBooking,
    confirmBooking,
    getDriverBookings,
    rejectBooking,
} from "../controllers/booking.controller.js";

import {
    createBookingValidator,
    cancelBookingValidator,
    rejectBookingValidator
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
    "/",
    protect,
    getBookings
);
router.get(
    "/driver",
    protect,
    authorize(ROLES.DRIVER),
    getDriverBookings
);
router.get(
    "/:id",
    protect,
    getBookingById
);

router.patch(
    "/:id/cancel",
    protect,
    authorize(ROLES.PASSENGER),
    cancelBookingValidator,
    validate,
    cancelBooking
);

router.patch(
    "/:id/confirm",
    protect,
    authorize(
        ROLES.DRIVER,
        ROLES.PLATFORM_ADMIN
    ),
    confirmBooking
);

router.patch(
    "/:id/reject",
    protect,
    authorize(ROLES.DRIVER),
    rejectBookingValidator,
    validate,
    rejectBooking
);
export default router;