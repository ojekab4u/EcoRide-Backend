import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get(
    "/",
    protect,
    getNotifications
);

router.patch(
    "/read-all",
    protect,
    markAllNotificationsAsRead
);

router.patch(
    "/:id/read",
    protect,
    markNotificationAsRead
);

router.delete(
    "/:id",
    protect,
    deleteNotification
);

export default router;