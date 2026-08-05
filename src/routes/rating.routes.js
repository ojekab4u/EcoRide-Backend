
import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
    rateDriver,
    ratePassenger,
    getMyRatings,
    getDriverRatings,
    getPassengerRatings,
} from "../controllers/rating.controller.js";

import {
    createRatingValidator,
} from "../validators/rating.validator.js";

const router = express.Router();

router.post(
    "/driver/:bookingId",
    protect,
    authorize(ROLES.PASSENGER),
    createRatingValidator,
    validate,
    rateDriver
);

router.post(
    "/passenger/:bookingId",
    protect,
    authorize(ROLES.DRIVER),
    createRatingValidator,
    validate,
    ratePassenger
);

router.get(
    "/me",
    protect,
    authorize(
        ROLES.PASSENGER,
        ROLES.DRIVER
    ),
    getMyRatings
);

router.get(
    "/driver/:driverId",
    getDriverRatings
);


router.get(
    "/passenger/:passengerId",
    getPassengerRatings
);

router.get(
    "/driver/:driverId",
    getDriverRatings
);

export default router;