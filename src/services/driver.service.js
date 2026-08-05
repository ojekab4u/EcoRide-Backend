
import { Sequelize } from "sequelize";
import { MESSAGES } from "../constants/messages.js";
import User from "../models/user.model.js";
import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";
import Booking from "../models/booking.model.js";
import Rating from "../models/rating.model.js";

export const createDriverProfileService = async (
    userId,
    userData
) => {

    // Check user exists
    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    // Only drivers can create profile
    if (user.role !== ROLES.DRIVER) {
        throw new AppError(
            "Only drivers can create a driver profile.",
            403
        );
    }

    // One profile per user
    const existingProfile = await DriverProfile.findOne({
        where: { userId },
    });

    if (existingProfile) {
        throw new AppError(
            "Driver profile already exists.",
            400
        );
    }

    // Check duplicate licence number BEFORE inserting
    const existingLicense = await DriverProfile.findOne({
        where: {
            licenseNumber: userData.licenseNumber,
        },
    });

    if (existingLicense) {
        throw new AppError(
            "This driver's license number is already registered.",
            409
        );
    }

    try {

        const driverProfile =
            await DriverProfile.create({
                ...userData,
                userId,
                profileCompleted: false,
            });

        return driverProfile;

    } catch (error) {

        if (
            error instanceof Sequelize.UniqueConstraintError
        ) {
            throw new AppError(
                "This driver's license number is already registered.",
                409
            );
        }

        throw error;
    }
};

export const getDriverProfileService = async (userId) => {

    const driverProfile = await DriverProfile.findOne({
        where: { userId },
        include: [
            {
                model: User,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "phoneNumber",
                    "profilePicture",
                    "isVerified",
                ],
            },
        ],
    });

    if (!driverProfile) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    const ratings = await Rating.findAll({
        where: {
            revieweeId: userId,
        },
    });

    const averageRating =
        ratings.length > 0
            ? Number(
                  (
                      ratings.reduce(
                          (sum, rating) =>
                              sum +
                              Number(rating.driverRating || 0),
                          0
                      ) / ratings.length
                  ).toFixed(1)
              )
            : 0;

    return {

        profile: {

            id: driverProfile.User.id,

            firstName:
                driverProfile.User.firstName,

            lastName:
                driverProfile.User.lastName,

            fullName:
                `${driverProfile.User.firstName} ${driverProfile.User.lastName}`,

            email:
                driverProfile.User.email,

            phoneNumber:
                driverProfile.User.phoneNumber,

            profilePicture:
                driverProfile.User.profilePicture,

            verified:
                driverProfile.User.isVerified,

            averageRating,

            totalRatings:
                ratings.length,

        },

        driver: {

            licenseNumber:
                driverProfile.licenseNumber,

            licenseExpiry:
                driverProfile.licenseExpiry,

            yearsOfExperience:
                driverProfile.yearsOfExperience,

            preferredVehicleType:
                driverProfile.preferredVehicleType,

            verificationStatus:
                driverProfile.verificationStatus,

            rejectionReason:
                driverProfile.rejectionReason,

            profileCompleted:
                driverProfile.profileCompleted,

        },

    };

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