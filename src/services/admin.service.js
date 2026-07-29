import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import { paginate } from "../utils/pagination.js";


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