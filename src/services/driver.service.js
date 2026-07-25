

import { MESSAGES } from "../constants/messages.js";
import User from "../models/user.model.js";
import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";

export const createDriverProfileService = async (userId, userData) => {

    // Check if the logged-in user exists
    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    // Only drivers can create a driver profile
    if (user.role !== ROLES.DRIVER) {
        throw new AppError(
            "Only drivers can create a driver profile.",
            403
        );
    }

    // Prevent duplicate driver profiles
    const existingProfile = await DriverProfile.findOne({
        where: { userId },
    });

    if (existingProfile) {
        throw new AppError(
            "Driver profile already exists.",
            400
        );
    }

    // Create the profile
    const driverProfile = await DriverProfile.create({
        ...userData,
        userId,
        profileCompleted: false,
    });

    return driverProfile;
};

export const getDriverProfileService = async (userId) => {

    const driverProfile = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driverProfile) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    return driverProfile;
};

export const updateDriverProfileService = async (
    userId,
    userData
) => {

    const driverProfile = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driverProfile) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    const {
        verificationStatus,
        rejectionReason,
        profileCompleted,
        createdAt,
        updatedAt,
        id,
        userId: ignoredUserId,
        ...allowedUpdates
    } = userData;
    await driverProfile.update(allowedUpdates);

    return driverProfile;
};