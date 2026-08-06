import sequelize from "../config/database.js";
import { Op } from "sequelize";

import User from "../models/user.model.js";
import Ride from "../models/ride.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Wallet from "../models/wallet.model.js";
import Notification from "../models/notification.model.js";
import DriverProfile from "../models/driver.model.js";
import PassengerProfile from "../models/passengerProfile.model.js";
import Vehicle from "../models/vehicle.model.js";

import { ROLES } from "../constants/roles.js";


export const getAdminDashboardService = async () => {

    // USERS   

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

    const totalCorporateAdmins =
        await User.count({
            where: {
                role: ROLES.CORPORATE_ADMIN,
            },
        });

    const verifiedUsers = await User.count({
        where: {
            isVerified: true,
        },
    });

   
    // RIDES    

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

   
    // BOOKINGS   
    const totalBookings = await Booking.count();

    const activeBookings =
        await Booking.count({
            where: {
                bookingStatus: {
                    [Op.in]: [
                        "PENDING",
                        "ACCEPTED",
                    ],
                },
            },
        });

    const completedBookings =
        await Booking.count({
            where: {
                bookingStatus: "COMPLETED",
            },
        });

    const cancelledBookings =
        await Booking.count({
            where: {
                bookingStatus: "CANCELLED",
            },
        });

    
    // FINANCE 

    const totalRevenue =
        Number(
            await Payment.sum("amount", {
                where: {
                    paymentStatus: "SUCCESS",
                    paymentType: "BOOKING",
                },
            })
        ) || 0;

    const commissionRate = 0.10;

    const platformRevenue =
        Number(
            (
                totalRevenue *
                commissionRate
            ).toFixed(2)
        );

    const driverPayout =
        Number(
            (
                totalRevenue -
                platformRevenue
            ).toFixed(2)
        );

    const totalWalletBalance =
        Number(
            await Wallet.sum("balance")
        ) || 0;

   
    // VERIFICATION  

    const pendingDrivers = await DriverProfile.count({
    where: {
        verificationStatus: "PENDING",
    },
});

        const pendingPassengers = await PassengerProfile.count({
        where: {
            profileCompleted: false,
        },
    });

   
    const pendingVehicles =
        await Vehicle.count({
            where: {
                verificationStatus:
                    "PENDING",
            },
        });

  
    // RECENT ACTIVITIES
   
    const recentActivities =
        await Notification.findAll({

            limit: 10,

            order: [
                [
                    "createdAt",
                    "DESC",
                ],
            ],

            attributes: [
                "id",
                "title",
                "message",
                "createdAt",
                "isRead",
            ],

        });

  
    // MONTHLY REVENUE   
    const currentYear =
        new Date().getFullYear();

    const revenueChart = [];

    for (let month = 0; month < 12; month++) {

        const start =
            new Date(
                currentYear,
                month,
                1
            );

        const end =
            new Date(
                currentYear,
                month + 1,
                1
            );

        const revenue =
            Number(
                await Payment.sum(
                    "amount",
                    {
                        where: {
                            paymentStatus:
                                "SUCCESS",

                            paymentType:
                                "BOOKING",

                            createdAt: {
                                [Op.gte]:
                                    start,

                                [Op.lt]:
                                    end,
                            },
                        },
                    }
                )
            ) || 0;

        revenueChart.push({

            month:
                start.toLocaleString(
                    "default",
                    {
                        month: "short",
                    }
                ),

            revenue,

        });

    }

            const recentUsers = await User.findAll({
            attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "role",
                "createdAt",
            ],
            order: [["createdAt", "DESC"]],
            limit: 5,
        });

        const recentRides = await Ride.findAll({
            attributes: [
                "id",
                "pickupLocation",
                "destination",
                "status",
                "departureTime",
                "createdAt",
            ],
            order: [["createdAt", "DESC"]],
            limit: 5,
        });

        const recentBookings = await Booking.findAll({
            limit: 5,
            order: [["createdAt", "DESC"]],
        });

        const recentPayments = await Payment.findAll({
            limit: 5,
            order: [["createdAt", "DESC"]],
        });

        const monthlyRevenue = await Payment.findAll({
                where: {
                    paymentStatus: "SUCCESS",
                },
                attributes: [
                    [
                        sequelize.fn(
                            "DATE_TRUNC",
                            "month",
                            sequelize.col("createdAt")
                        ),
                        "month",
                    ],
                    [
                        sequelize.fn(
                            "SUM",
                            sequelize.col("amount")
                        ),
                        "revenue",
                    ],
                ],
                group: ["month"],
                order: [["month", "ASC"]],
            });
            const rideDistribution = {

                scheduled: scheduledRides,
                ongoing: ongoingRides,
                completed: completedRides,
                cancelled: cancelledRides,

            };

            const systemHealth = {

                api: "HEALTHY",

                database: "CONNECTED",

                uptime: process.uptime(),

            };

    return {

        overview: {

            totalUsers,

            totalDrivers,

            totalPassengers,

            totalCorporateAdmins,

            verifiedUsers,

            activeBookings,

            totalRevenue,

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
            activeBookings,
            completedBookings,
            cancelledBookings,

        },

        finance: {
            totalRevenue: Number(totalRevenue),
            platformRevenue,
            driverPayout,
            totalWalletBalance: Number(totalWalletBalance),

        },

        verification: {
            pendingDrivers,
            pendingPassengers,
            pendingVehicles,

        },
        monthlyRevenue :monthlyRevenue ,
        revenueChart,
        recentActivity: {
                recentUsers,
                recentBookings,
                recentPayments,
            },
              approvals: {
                pendingDrivers,
                pendingPassengers,
                pendingVehicles,
            },

            revenueTrend: monthlyRevenue,

    };

};