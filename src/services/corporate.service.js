import CorporateProfile from "../models/corporateProfile.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const createCorporateProfileService = async (
    userId,
    profileData
) => {

    const existingProfile =
        await CorporateProfile.findOne({
            where: { userId },
        });

    if (existingProfile) {
        throw new AppError(
            "Corporate profile already exists.",
            409
        );
    }

    const profile =
        await CorporateProfile.create({
            ...profileData,
            userId,
            profileCompleted: true,
        });

    return profile;
};

export const getCorporateProfileService = async (
    userId
) => {

    const profile =
        await CorporateProfile.findOne({

            where: { userId },

            include: [User],

        });

    if (!profile) {
        throw new AppError(
            "Corporate profile not found.",
            404
        );
    }

    return profile;
};

export const updateCorporateProfileService = async (
    userId,
    body
) => {

    const profile =
        await CorporateProfile.findOne({
            where: { userId },
        });

    if (!profile) {
        throw new AppError(
            "Corporate profile not found.",
            404
        );
    }

    await profile.update(body);

    return profile;
};

export const getCorporateDashboardService = async (
    userId
) => {

    const corporate =
        await CorporateProfile.findOne({

            where: {
                userId
            },

            include: [
                CorporateDocument
            ]

        });

    if (!corporate) {

        throw new AppError(
            "Corporate profile not found.",
            404
        );

    }

    return {

        company: {

            id: corporate.id,

            companyName:
                corporate.companyName,

            rcNumber:
                corporate.rcNumber,

            companyPhone:
                corporate.companyPhone,

            companyAddress:
                corporate.companyAddress,

            industry:
                corporate.industry,

            companyLogo:
                corporate.companyLogo,

            verificationStatus:
                corporate.verificationStatus,

            profileCompleted:
                corporate.profileCompleted,

            documents:
                corporate.CorporateDocument

        },

        stats: {

            employees: 0,

            activeBookings: 0,

            completedTrips: 0

        }

    };

};