import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import { paginate } from "../utils/pagination.js";

import { ROLES } from "../constants/roles.js";

import DriverDocument from "../models/driverDocument.model.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import PassengerProfile from "../models/passengerProfile.model.js";
import PassengerDocument from "../models/passengerDocument.model.js";
import EmergencyContact from "../models/emergencyContact.model.js";

export const reviewDriverProfileService = async (
    driverId,
    status,
    reason
) => {

    const profile =
        await DriverProfile.findByPk(driverId);

    if (!profile) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    profile.verificationStatus = status;

    if (status === "REJECTED") {

        profile.rejectionReason = reason;

        profile.profileCompleted = false;

    } else {

        profile.rejectionReason = null;

        profile.profileCompleted = true;

    }

    await profile.save();

    return profile;

};


export const getUsersService = async (query) => {

    const {
        page,
        limit,
        role,
        status,
        search,
    } = query;

    const pagination = paginate({
    page,
    limit,
});

    const where = {};

    if (role) {
        where.role = role.toUpperCase();
    }

    if (status) {
        where.status = status.toUpperCase();
    }

    if (search) {

        where[Op.or] = [

            {
                firstName: {
                    [Op.iLike]: `%${search}%`,
                },
            },

            {
                lastName: {
                    [Op.iLike]: `%${search}%`,
                },
            },

            {
                email: {
                    [Op.iLike]: `%${search}%`,
                },
            },

            {
                phoneNumber: {
                    [Op.iLike]: `%${search}%`,
                },
            },

        ];

    }

    const { count, rows } =
        await User.findAndCountAll({

            where,

            limit: pagination.limit,

            offset: pagination.offset,

            order: [
                ["createdAt", "DESC"],
            ],

        });

    return {

        users: rows,

        pagination: {

            totalItems: count,

            totalPages: Math.ceil(
                count / pagination.limit
            ),

            currentPage:
                pagination.currentPage,

            pageSize:
                pagination.limit,

        },

    };

};

export const updateUserRoleService = async (
    userId,
    role
) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    role = role.trim().toUpperCase();

    const allowedRoles = [
        ROLES.PASSENGER,
        ROLES.DRIVER,
        ROLES.CORPORATE_ADMIN,
        ROLES.PLATFORM_ADMIN,
    ];

    if (!allowedRoles.includes(role)) {
        throw new AppError(
            "Invalid role selected.",
            400
        );
    }

    user.role = role;

    await user.save();

    return user;
};


export const getDriverDetailsService = async (driverId) => {

    const driver = await DriverProfile.findByPk(driverId);

    if (!driver) {
        throw new AppError(
            "Driver not found.",
            404
        );
    }

    const user = await User.findByPk(driver.userId);

    const documents =
        await DriverDocument.findOne({
            where: {
                driverId: driver.id,
            },
        });

    const vehicles =
        await Vehicle.findAll({
            where: {
                driverId: driver.id,
            },
            include: [
                VehicleInspection,
            ],
        });

    return {
        user,
        driver,
        documents,
        vehicles,
    };
};

export const getPassengerDetailsService = async (passengerId) => {

    const passenger = await PassengerProfile.findByPk(passengerId);

    if (!passenger) {
        throw new AppError("Passenger not found.", 404);
    }

    const user = await User.findByPk(passenger.userId);

    const documents = await PassengerDocument.findOne({
        where: {
            passengerProfileId: passenger.id,
        },
    });

    const emergencyContact = await EmergencyContact.findOne({
        where: {
            passengerProfileId: passenger.id,
        },
    });

    return {
        user,
        passenger,
        documents,
        emergencyContact,
    };
};

export const getDriversService = async () => {

    return await DriverProfile.findAll({

        include: [

            {
                model: User,
                attributes: {
                    exclude: [
                        "password",
                        "passwordResetToken",
                        "passwordResetExpires",
                    ],
                },
            },

            {
                model: Vehicle,
                include: [
                    VehicleInspection,
                ],
            },

            DriverDocument,

        ],

        order: [
            ["createdAt", "DESC"],
        ],

    });

};



export const getPassengersService = async () => {

    return await PassengerProfile.findAll({

        include: [

            {
                model: User,
                attributes: {
                    exclude: [
                        "password",
                        "passwordResetToken",
                        "passwordResetExpires",
                    ],
                },
            },

            PassengerDocument,

            EmergencyContact,

        ],

        order: [
            ["createdAt", "DESC"],
        ],

    });

};

export const reviewPassengerProfileService = async (
    passengerId,
    status,
    reason
) => {

    const passenger = await PassengerProfile.findByPk(passengerId);

    if (!passenger) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    const document = await PassengerDocument.findOne({
        where: {
            passengerProfileId: passenger.id,
        },
    });

    if (!document) {
        throw new AppError(
            "Passenger document not found.",
            404
        );
    }

    document.verificationStatus = status;

    if (status === "REJECTED") {

        document.rejectionReason = reason;

    } else {

        document.rejectionReason = null;

    }

    await document.save();

    const user = await User.findByPk(passenger.userId);

    if (user) {

        user.isVerified = status === "APPROVED";

        await user.save();

    }

    return document;
};