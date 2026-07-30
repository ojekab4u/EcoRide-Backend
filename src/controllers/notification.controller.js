import {
    getNotificationsService,
    markNotificationAsReadService,
    markAllNotificationsAsReadService,
} from "../services/notification.service.js";

import { successResponse } from "../utils/response.js";

export const getNotifications =
async (req, res, next) => {

    try {

        const notifications =
            await getNotificationsService();

        return successResponse(
            res,
            200,
            "Notifications retrieved successfully.",
            notifications
        );

    } catch (error) {
        next(error);
    }

};

export const markNotificationAsRead =
async (req, res, next) => {

    try {

        const notification =
            await markNotificationAsReadService();

        return successResponse(
            res,
            200,
            "Notification marked as read.",
            notification
        );

    } catch (error) {
        next(error);
    }

};

export const markAllNotificationsAsRead =
async (req, res, next) => {

    try {

        await markAllNotificationsAsReadService();

        return successResponse(
            res,
            200,
            "All notifications marked as read."
        );

    } catch (error) {
        next(error);
    }

};