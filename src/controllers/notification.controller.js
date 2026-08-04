import {
    getNotificationsService,
    markNotificationAsReadService,
    markAllNotificationsAsReadService,
    deleteNotificationService,
} from "../services/notification.service.js";

import { successResponse } from "../utils/response.js";


export const getNotifications = async (
    req,
    res,
    next
) => {

    try {

        const notifications =
            await getNotificationsService(
                req.user.id
            );

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

export const markNotificationAsRead = async (
    req,
    res,
    next
) => {

    try {

        const notification =
            await markNotificationAsReadService(
                req.user.id,
                req.params.id
            );

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

export const markAllNotificationsAsRead = async (
    req,
    res,
    next
) => {

    try {

        await markAllNotificationsAsReadService(
            req.user.id
        );

        return successResponse(
            res,
            200,
            "All notifications marked as read."
        );

    } catch (error) {

        next(error);

    }

};

export const deleteNotification = async (
    req,
    res,
    next
) => {

    try {

        await deleteNotificationService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Notification deleted successfully."
        );

    } catch (error) {

        next(error);

    }

};