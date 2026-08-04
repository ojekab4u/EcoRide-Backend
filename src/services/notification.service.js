import Notification from "../models/notification.model.js";
import AppError from "../utils/AppError.js";

export const createNotification = async ({
    userId,
    title,
    message,
    type,
    referenceId = null,
}) => {

    return await Notification.create({
        userId,
        title,
        message,
        type,
        referenceId,
    });

};

export const getNotificationsService = async (
    userId
) => {

    return await Notification.findAll({

        where: {
            userId,
        },

        order: [
            ["createdAt", "DESC"],
        ],

    });

};

export const markNotificationAsReadService = async (
    userId,
    notificationId
) => {

    const notification =
        await Notification.findOne({

            where: {
                id: notificationId,
                userId,
            },

        });

    if (!notification) {

        throw new AppError(
            "Notification not found.",
            404
        );

    }

    notification.isRead = true;

    await notification.save();

    return notification;

};

export const markAllNotificationsAsReadService = async (
    userId
) => {

    await Notification.update(

        {
            isRead: true,
        },

        {
            where: {
                userId,
                isRead: false,
            },
        }

    );

    return;

};

export const deleteNotificationService = async (
    userId,
    notificationId
) => {

    const notification =
        await Notification.findOne({

            where: {
                id: notificationId,
                userId,
            },

        });

    if (!notification) {

        throw new AppError(
            "Notification not found.",
            404
        );

    }

    await notification.destroy();

};