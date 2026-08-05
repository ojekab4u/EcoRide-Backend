import { Op, fn, col } from "sequelize";
import Payment from "../models/payment.model.js";
import Wallet from "../models/wallet.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Ride from "../models/ride.model.js";
import { Rating } from "../models/index.js";
import Booking from "../models/booking.model.js";
import DriverProfile from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import PassengerProfile from "../models/passengerProfile.model.js";
import WalletTransaction from "../models/WalletTransaction.model.js";

export const getDriverDashboardService = async (userId) => {

    // Driver Profile
    const driver = await DriverProfile.findOne({
        where: { userId },
        include: [
            {
                model: User,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
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

    // Wallet
    const wallet = await Wallet.findOne({
        where: { userId },
    });

    // Vehicle
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

    // Date Range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Today's Earnings
    const todayEarnings =
        await WalletTransaction.sum("amount", {
            include: [
                {
                    model: Wallet,
                    where: {
                        userId,
                    },
                    attributes: [],
                },
            ],
            where: {
                type: "TRIP_EARNING",
                transactionType: "CREDIT",
                createdAt: {
                    [Op.between]: [
                        todayStart,
                        todayEnd,
                    ],
                },
            },
        }) || 0;

    // Driver Rides
    const rides = await Ride.findAll({
        where: {
            vehicleId: vehicle.id,
        },
    });

    const rideIds = rides.map(
        ride => ride.id
    );

    // Ride Counts
    const totalTrips = rides.length;

    const scheduledTrips =
        rides.filter(
            ride => ride.status === "SCHEDULED"
        ).length;

    const acceptedTrips =
        rides.filter(
            ride => ride.status === "ACCEPTED"
        ).length;

    const ongoingTrips =
        rides.filter(
            ride => ride.status === "ONGOING"
        ).length;

    const completedTrips =
        rides.filter(
            ride => ride.status === "COMPLETED"
        ).length;

    const cancelledTrips =
        rides.filter(
            ride => ride.status === "CANCELLED"
        ).length;

    // Pending Requests
    const pendingRequests =
        await Booking.count({
            where: {
                rideId: {
                    [Op.in]: rideIds,
                },
                bookingStatus: "PENDING",
            },
        }); 
   


const driverRatings = await Rating.findAll({
    where: {
        revieweeId: userId,
    },
});

const averageDriverRating =
    driverRatings.length
        ? Number(
              (
                  driverRatings.reduce(
                      (sum, rating) =>
                          sum +
                          Number(
                              rating.driverRating || 0
                          ),
                      0
                  ) / driverRatings.length
              ).toFixed(1)
          )
        : 0;

    // Active Ride
    const activeRide =
        await Ride.findOne({
            where: {
                vehicleId: vehicle.id,
                status: "ONGOING",
            },
            include: [
                {
                    model: Booking,
                    where: {
                        bookingStatus: "ACCEPTED",
                    },
                    required: false,
                },
            ],
        });

    // Upcoming Rides
    const upcomingRides =
        await Ride.findAll({
            where: {
                vehicleId: vehicle.id,
                status: "SCHEDULED",
            },
            limit: 5,
            order: [
                [
                    "departureTime",
                    "ASC",
                ],
            ],
        });

    // Recent Booking Requests
    const newBookingRequests =
        await Booking.findAll({
            where: {
                rideId: {
                    [Op.in]: rideIds,
                },
                bookingStatus: "PENDING",
            },
            include: [
                {
                    model: User,
                    attributes: [
                        "firstName",
                        "lastName",
                        "profilePicture",
                    ],
                },
                {
                    model: Ride,
                    attributes: [
                        "pickupLocation",
                        "destination",
                        "departureTime",
                    ],
                },
            ],
            order: [
                [
                    "createdAt",
                    "DESC",
                ],
            ],
            limit: 5,
        });

    // Notifications
    const unreadNotifications =
        await Notification.count({
            where: {
                userId,
                isRead: false,
            },
        });

    return {

        profile: {

            firstName:
                driver.User.firstName,

            lastName:
                driver.User.lastName,

            fullName:
                `${driver.User.firstName} ${driver.User.lastName}`,

            email:
                driver.User.email,

            profilePicture:
                driver.User.profilePicture,

            verified:
                driver.User.isVerified,

            rating: averageDriverRating,

        },

        wallet: {

            balance:
                Number(
                    wallet?.balance || 0
                ),

            todayEarnings:
                Number(
                    todayEarnings
                ),

            currency: "NGN",

        },

        stats: {

            totalTrips,

            scheduledTrips,

            acceptedTrips,

            ongoingTrips,

            completedTrips,

            cancelledTrips,

            pendingRequests,

        },

        activeRide:
            activeRide
                ? {
                      id:
                          activeRide.id,

                      pickupLocation:
                          activeRide.pickupLocation,

                      destination:
                          activeRide.destination,

                      departureTime:
                          activeRide.departureTime,

                      remainingSeats:
                          activeRide.remainingSeats,

                      passengers:
                          activeRide.Bookings
                              ?.length || 0,

                      estimatedEarning:
                          Number(
                              activeRide.pricePerSeat
                          ) *
                          (
                              activeRide.Bookings
                                  ?.length || 0
                          ),

                      status:
                          activeRide.status,
                  }
                : null,

        upcomingRides,

        newBookingRequests,

        notifications: {

            unread:
                unreadNotifications,

        },

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

    const amountSpent =
    await Payment.sum("amount", {
        where: {
            userId,
            paymentType: "BOOKING",
            paymentStatus: "SUCCESS",
        },
    }) || 0;

  const passengerRatings = await Rating.findAll({
    where: {
        revieweeId: userId,
    },
});

const averagePassengerRating =
    passengerRatings.length
        ? Number(
              (
                  passengerRatings.reduce(
                      (sum, rating) =>
                          sum +
                          Number(
                              rating.passengerRating || 0
                          ),
                      0
                  ) / passengerRatings.length
              ).toFixed(1)
          )
        : 0;
        
    //Placeholder
    const amountSaved = 0;

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
            email: passenger.User.email,
            profilePicture: passenger.User.profilePicture,
            verified: passenger.User.isVerified,
            rating: averagePassengerRating,
        },

        wallet: {
           balance: Number(wallet?.balance || 0),
    currency: "NGN",
        },

        stats: {
            totalTrips: totalBookings,
            upcomingTrips,
            completedTrips,
            cancelledTrips,
            amountSpent: Number(amountSpent),
            amountSaved,
},
        upcomingTrip,

        currentTrip: currentTrip ? {
        id: currentTrip.id,
        bookingReference: currentTrip.bookingReference,
        fare: currentTrip.fare,
        Ride: currentTrip.Ride,
      }  : null,

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