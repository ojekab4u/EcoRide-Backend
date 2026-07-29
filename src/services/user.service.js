import User from "../models/user.model.js";
import AppError from "../errors/AppError.js";
import { MESSAGES } from "../constants/messages.js";

export const getProfile = async (userId) => {

    const user = await User.findByPk(userId, {
        attributes: {
            exclude: [ "password",
            "passwordResetToken",
            "passwordResetExpires",
            "passwordChangedAt",
            "lastLogin",],
        },
    });

    if (!user) {
        throw new AppError(
            MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    return user;
};

export const updateProfile = async (
    userId,
    userData
) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError(
            MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    const {
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
    } = userData;

    await user.update({
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
    });

    return user;
};