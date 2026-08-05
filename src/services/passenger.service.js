
import PassengerProfile from "../models/passengerProfile.model.js";
import User from "../models/user.model.js";
import EmergencyContact from "../models/emergencyContact.model.js";
import PassengerDocument from "../models/passengerDocument.model.js";
import Wallet from "../models/wallet.model.js";
import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import { Op } from "sequelize";
import AppError from "../utils/appError.js";



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

    const profile = await PassengerProfile.findOne({
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
                    "role",
                    "emailVerified",
                    "phoneVerified",
                    "isVerified",
                    "profilePicture",
                    "status",
                    "createdAt",
                    "updatedAt",
                ],
            },
            {
                model: EmergencyContact,
            },
            {
                model: PassengerDocument,
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                    ],
                },
            },
        ],
    });

    if (!profile) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    // Wallet
    const wallet = await Wallet.findOne({
        where: { userId },
        attributes: ["balance"],
    });

    // Booking statistics
    const bookings = await Booking.findAll({
        where: {
            passengerId: userId,
            bookingStatus: {
                [Op.in]: [
                    "ACCEPTED",
                    "COMPLETED",
                ],
            },
        },
    });

    const totalRides = bookings.length;

    const amountSpent = bookings.reduce(
        (sum, booking) => sum + Number(booking.fare),
        0
    );

    // Placeholder for referral/discount 
    const amountSaved = 0;

    // Recent bookings 
    const recentBookings = await Booking.findAll({
        where: { passengerId: userId },
        include: [
            {
                model: Ride,
                attributes: [
                    "pickupLocation",
                    "destination",
                    "departureTime",
                    "status",
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
        limit: 5,
    });

    return {
        ...profile.toJSON(),

        wallet: {
            balance: wallet?.balance ?? 0,
        },

        statistics: {
            totalRides,
            amountSpent,
            amountSaved,
        },

        recentBookings,
    };
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