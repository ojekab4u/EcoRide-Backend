import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get(
    "/",
    protect,
    getNotifications
);

router.patch(
    "/:id/read",
    protect,
    markNotificationAsRead
);

router.patch(
    "/read-all",
    protect,
    markAllNotificationsAsRead
);

export default router;