import { Op } from "sequelize";

import User from "../models/user.model.js";
import Ride from "../models/ride.model.js";
import Booking from "../models/booking.model.js";
import DriverProfile from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";


export const getDriverDashboardService = async (
    userId
) => {

    const driver =
        await DriverProfile.findOne({
            where: { userId },
        });

    if (!driver) {
        throw new Error("Driver profile not found.");
    }

    const vehicle =
        await Vehicle.findOne({
            where: {
                driverId: driver.id,
            },
        });

    if (!vehicle) {
        return {
            totalRides: 0,
            scheduledRides: 0,
            ongoingRides: 0,
            completedRides: 0,
            pendingBookings: 0,
            confirmedBookings: 0,
        };
    }

    const rides = await Ride.findAll({
        where: {
            vehicleId: vehicle.id,
        },
    });

    const rideIds = rides.map(r => r.id);

    const totalRides = rides.length;

    const scheduledRides = rides.filter(
        r => r.status === "SCHEDULED"
    ).length;

    const ongoingRides = rides.filter(
        r => r.status === "ONGOING"
    ).length;

    const completedRides = rides.filter(
        r => r.status === "COMPLETED"
    ).length;

    const pendingBookings =
        await Booking.count({
            where: {
                rideId: {
                    [Op.in]: rideIds,
                },
                bookingStatus: "PENDING",
            },
        });

    const confirmedBookings =
        await Booking.count({
            where: {
                rideId: {
                    [Op.in]: rideIds,
                },
                bookingStatus: "ACCEPTED",
            },
        });

    return {
        totalRides,
        scheduledRides,
        ongoingRides,
        completedRides,
        pendingBookings,
        confirmedBookings,
    };
};

export const getPassengerDashboardService = async (
    userId
) => {

    const totalBookings = await Booking.count({
        where: {
            passengerId: userId,
        },
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

    return {
        totalBookings,
        upcomingTrips,
        completedTrips,
        cancelledTrips,
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