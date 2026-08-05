import { Op } from "sequelize";
import Wallet from "../models/wallet.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Ride from "../models/ride.model.js";
import Booking from "../models/booking.model.js";
import DriverProfile from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import PassengerProfile from "../models/passengerProfile.model.js";

export const getDriverDashboardService = async (userId) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
        include: [
            {
                model: User,
                attributes: [
                    "firstName",
                    "lastName",
                    "profilePicture",
                    "isVerified",
                ],
            },
        ],
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    const vehicle = await Vehicle.findOne({
        where: {
            driverId: driver.id,
        },
    });

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    const rides = await Ride.findAll({
        where: {
            vehicleId: vehicle.id,
        },
    });

    const rideIds = rides.map(
        ride => ride.id
    );

    const activeRide = await Ride.findOne({
        where: {
            vehicleId: vehicle.id,
            status: "ONGOING",
        },
    });

    const recentRides = await Ride.findAll({
        where: {
            vehicleId: vehicle.id,
        },
        limit: 5,
        order: [["createdAt", "DESC"]],
    });

    return {

        profile: {
            fullName:
                `${driver.User.firstName} ${driver.User.lastName}`,
            profilePicture:
                driver.User.profilePicture,
            verified:
                driver.User.isVerified,
            vehiclePlate:
                vehicle.plateNumber,
            vehicleModel:
                vehicle.vehicleModel,
        },

        stats: {

            totalRides:
                rides.length,

            scheduledRides:
                rides.filter(r =>
                    r.status === "SCHEDULED"
                ).length,

            acceptedRides:
                rides.filter(r =>
                    r.status === "ACCEPTED"
                ).length,

            ongoingRides:
                rides.filter(r =>
                    r.status === "ONGOING"
                ).length,

            completedRides:
                rides.filter(r =>
                    r.status === "COMPLETED"
                ).length,

            cancelledRides:
                rides.filter(r =>
                    r.status === "CANCELLED"
                ).length,

            pendingBookings:
                await Booking.count({
                    where: {
                        rideId: {
                            [Op.in]: rideIds,
                        },
                        bookingStatus: "PENDING",
                    },
                }),

            acceptedBookings:
                await Booking.count({
                    where: {
                        rideId: {
                            [Op.in]: rideIds,
                        },
                        bookingStatus: "ACCEPTED",
                    },
                }),

        },

        activeRide,

        recentRides,

    };

};

export const getPassengerDashboardService = async (userId) => {

    const passenger = await PassengerProfile.findOne({
        where: { userId },
        include: [
            {
                model: User,
                attributes: [
                    "firstName",
                    "lastName",
                    "email",
                    "profilePicture",
                    "isVerified",
                ],
            },
        ],
    });

    if (!passenger) {
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

    // Dashboard statistics
    const totalBookings = await Booking.count({
        where: { passengerId: userId },
    });

    const upcomingTrips = await Booking.count({
        where: {
            passengerId: userId,
            bookingStatus: "ACCEPTED",
        },
    });

    const completedTrips = await Booking.count({
        where: {
            passengerId: userId,
            bookingStatus: "COMPLETED",
        },
    });

    const cancelledTrips = await Booking.count({
        where: {
            passengerId: userId,
            bookingStatus: "CANCELLED",
        },
    });

    // Upcoming trip
    const upcomingTrip = await Booking.findOne({
        where: {
            passengerId: userId,
            bookingStatus: "ACCEPTED",
        },
        attributes: [
            "id",
            "bookingReference",
            "fare",
            "travelDate",
            "bookingStatus",
        ],
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
        order: [["createdAt", "ASC"]],
    });

    // Current trip
    const currentTrip = await Booking.findOne({
        where: {
            passengerId: userId,
            bookingStatus: "ACCEPTED",
        },
        attributes: [
            "id",
            "bookingReference",
            "fare",
        ],
        include: [
            {
                model: Ride,
                where: {
                    status: "ONGOING",
                },
                required: false,
                attributes: [
                    "pickupLocation",
                    "destination",
                    "departureTime",
                    "currentLatitude",
                    "currentLongitude",
                    "status",
                ],
            },
        ],
    });

    // Recent bookings
    const recentBookings = await Booking.findAll({
        where: {
            passengerId: userId,
        },
        attributes: [
            "id",
            "bookingReference",
            "fare",
            "bookingStatus",
            "travelDate",
        ],
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
        limit: 5,
        order: [["createdAt", "DESC"]],
    });

    // Notification badge
    const unreadNotifications = await Notification.count({
        where: {
            userId,
            isRead: false,
        },
    });

    return {

        profile: {
            firstName: passenger.User.firstName,
            lastName: passenger.User.lastName,
            fullName: `${passenger.User.firstName} ${passenger.User.lastName}`,
            email: passenger.User.email,
            profilePicture: passenger.User.profilePicture,
            verified: passenger.User.isVerified,
        },

        wallet: {
            balance: wallet?.balance ?? 0,
        },

        stats: {
            totalBookings,
            upcomingTrips,
            completedTrips,
            cancelledTrips,
        },

        upcomingTrip,

        currentTrip,

        recentBookings,

        notifications: {
            unread: unreadNotifications,
        },
    };
};

export const getAdminDashboardService = async () => {

    const totalUsers = await User.count();

    const totalDrivers = await User.count({
        where: {
            role: "DRIVER",
        },
    });

    const totalPassengers = await User.count({
        where: {
            role: "PASSENGER",
        },
    });

    const totalVehicles = await Vehicle.count();

    const pendingVehicles =
        await Vehicle.count({
            where: {
                verificationStatus: "PENDING",
            },
        });

    const approvedVehicles =
        await Vehicle.count({
            where: {
                verificationStatus: "APPROVED",
            },
        });

    const rejectedVehicles =
        await Vehicle.count({
            where: {
                verificationStatus: "REJECTED",
            },
        });

   const pendingInspections =
    await VehicleInspection.count({
        where: {
            inspectionStatus: "PENDING",
        },
    });

const approvedInspections =
    await VehicleInspection.count({
        where: {
            inspectionStatus: "PASSED",
        },
    });

const rejectedInspections =
    await VehicleInspection.count({
        where: {
            inspectionStatus: "FAILED",
        },
    });

    const totalRides = await Ride.count();

    const activeRides = await Ride.count({
        where: {
            status: {
                [Op.in]: [
                    "SCHEDULED",
                    "ONGOING",
                ],
            },
        },
    });

    const completedRides = await Ride.count({
        where: {
            status: "COMPLETED",
        },
    });

    const totalBookings =
        await Booking.count();

    const pendingBookings =
        await Booking.count({
            where: {
                bookingStatus: "PENDING",
            },
        });

    return {

        users: {
            totalUsers,
            totalDrivers,
            totalPassengers,
        },

        vehicles: {
            totalVehicles,
            pendingVehicles,
            approvedVehicles,
            rejectedVehicles,
        },

        inspections: {
            pendingInspections,
            approvedInspections,
            rejectedInspections,
        },

        rides: {
            totalRides,
            activeRides,
            completedRides,
        },

        bookings: {
            totalBookings,
            pendingBookings,
        },

    };

};