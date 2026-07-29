import PassengerProfile from "../models/passengerProfile.model.js";
import EmergencyContact from "../models/emergencyContact.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const createPassengerProfileService = async (
    userId,
    profileData
) => {

    const existingProfile =
        await PassengerProfile.findOne({
            where: { userId },
        });

    if (existingProfile) {
        throw new AppError(
            "Passenger profile already exists.",
            400
        );
    }

    const profile = await PassengerProfile.create({
        ...profileData,
        userId,
        profileCompleted: true,
    });

    return profile;
};

export const getPassengerProfileService = async (
    userId
) => {

    const profile =
        await PassengerProfile.findOne({
            where: { userId },
            include: [
                {
                    model: EmergencyContact,
                },
            ],
        });

    if (!profile) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    return profile;
};

export const updatePassengerProfileService = async (
    userId,
    profileData
) => {

    const profile =
        await PassengerProfile.findOne({
            where: { userId },
        });

    if (!profile) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    await profile.update(profileData);

    return profile;
};

export const createEmergencyContactService = async (
    userId,
    contactData
) => {

    const profile =
        await PassengerProfile.findOne({
            where: { userId },
        });

    if (!profile) {
        throw new AppError(
            "Create passenger profile first.",
            400
        );
    }

    const existingContact =
        await EmergencyContact.findOne({
            where: {
                passengerProfileId: profile.id,
            },
        });

    if (existingContact) {
        throw new AppError(
            "Emergency contact already exists.",
            400
        );
    }

    const contact =
        await EmergencyContact.create({
            ...contactData,
            passengerProfileId: profile.id,
        });

    // Mark overall verification step
    const user = await User.findByPk(userId);

    if (user) {
        user.isVerified = true;
        await user.save();
    }

    return contact;
};