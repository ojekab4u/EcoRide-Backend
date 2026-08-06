import { Op } from "sequelize";

import User from "../models/user.model.js";
import Ride from "../models/ride.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Wallet from "../models/wallet.model.js";

import { ROLES } from "../constants/roles.js";

export const getAdminDashboardService = async () => {

    const totalUsers = await User.count();

    const totalDrivers = await User.count({
        where: {
            role: ROLES.DRIVER,
        },
    });

    const totalPassengers = await User.count({
        where: {
            role: ROLES.PASSENGER,
        },
    });

    const totalCorporateAdmins = await User.count({
        where: {
            role: ROLES.CORPORATE_ADMIN,
        },
    });

    const totalRides = await Ride.count();

    const scheduledRides = await Ride.count({
        where: {
            status: "SCHEDULED",
        },
    });

    const ongoingRides = await Ride.count({
        where: {
            status: "ONGOING",
        },
    });

    const completedRides = await Ride.count({
        where: {
            status: "COMPLETED",
        },
    });

    const cancelledRides = await Ride.count({
        where: {
            status: "CANCELLED",
        },
    });

    const totalBookings = await Booking.count();

    const completedBookings = await Booking.count({
        where: {
            bookingStatus: "COMPLETED",
        },
    });

    const cancelledBookings = await Booking.count({
        where: {
            bookingStatus: "CANCELLED",
        },
    });

    const totalRevenue =
        await Payment.sum("amount", {
            where: {
                paymentStatus: "SUCCESS",
                paymentType: "BOOKING",
            },
        }) || 0;

    const totalWalletBalance =
        await Wallet.sum("balance") || 0;

    const commissionRate = 0.10;

    const platformRevenue =
        Number(totalRevenue) * commissionRate;

    const driverPayout =
        Number(totalRevenue) - platformRevenue;

    return {

        users: {
            totalUsers,
            totalDrivers,
            totalPassengers,
            totalCorporateAdmins,
        },

        rides: {
            totalRides,
            scheduledRides,
            ongoingRides,
            completedRides,
            cancelledRides,
        },

        bookings: {
            totalBookings,
            completedBookings,
            cancelledBookings,
        },

        finance: {
            totalRevenue: Number(totalRevenue),
            platformRevenue,
            driverPayout,
            totalWalletBalance: Number(totalWalletBalance),
        },

    };

};

