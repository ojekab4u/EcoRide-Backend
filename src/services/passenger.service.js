
import PassengerProfile from "../models/passengerProfile.model.js";
import User from "../models/user.model.js";
import EmergencyContact from "../models/emergencyContact.model.js";
import PassengerDocument from "../models/passengerDocument.model.js";
import Wallet from "../models/wallet.model.js";
import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import Ride from "../models/ride.model.js";
import { Op } from "sequelize";
import AppError from "../utils/AppError.js";
import Rating from "../models/rating.model.js";


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


    const totalTrips = await Booking.count({
        where: {
            passengerId: userId,
            bookingStatus: "COMPLETED",
        },
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

    const amountSpent =
    await Payment.sum("amount", {
        where: {
            userId,
            paymentType: "BOOKING",
            paymentStatus: "SUCCESS",
        },
    }) || 0;

    // Placeholder for referral/discount 
    const amountSaved = 0;
    
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
                          Number(
                              rating.passengerRating || 0
                          ),
                      0
                  ) / ratings.length
              ).toFixed(1)
          )
        : 0;

    const walletBalance = Number(
        wallet?.balance || 0
    );

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

    let completedFields = 0;

    const fields = [
        profile.gender,
        profile.dateOfBirth,
        profile.occupation,
        profile.homeLocation,
        profile.officeLocation,
        profile.User.phoneNumber,
        profile.User.profilePicture,
    ];

    fields.forEach(field => {
        if (field) completedFields++;
    });

    const profileCompletion = Math.round(
        (completedFields / fields.length) * 100
    );

    return {

    ...profile.toJSON(),

    wallet: {
        balance: walletBalance,
        currency: "NGN",
    },

    stats: {
    totalTrips,
    amountSpent: Number(amountSpent),
    amountSaved,
    averageRating,
    totalRatings: ratings.length,
},

    profileCompletion,

    referralCode: null,

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