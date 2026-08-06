import AppError from "../utils/AppError.js";

import User from "../models/user.model.js";
import CorporateProfile from "../models/corporateProfile.model.js";
import CorporateEmployee from "../models/corporateEmployee.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";

export const addEmployeeService = async (
    corporateUserId,
    data
) => {

    const corporate = await CorporateProfile.findOne({
        where: {
            userId: corporateUserId,
        },
    });

    if (!corporate) {
        throw new AppError(
            "Corporate profile not found.",
            404
        );
    }

    const user = await User.findByPk(data.userId);

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    const existingEmployee =
        await CorporateEmployee.findOne({
            where: {
                userId: data.userId,
            },
        });

    if (existingEmployee) {
        throw new AppError(
            "User already belongs to a corporate account.",
            409
        );
    }

    const employee =
        await CorporateEmployee.create({

            corporateId: corporate.id,

            userId: data.userId,

            employeeId: data.employeeId,

            department: data.department,

            position: data.position,

            status: "ACTIVE",

        });

    return employee;

};

export const getEmployeesService = async (
    corporateUserId
) => {

    const corporate = await CorporateProfile.findOne({

        where: {
            userId: corporateUserId,
        },

    });

    if (!corporate) {

        throw new AppError(
            "Corporate profile not found.",
            404
        );

    }

    return await CorporateEmployee.findAll({

        where: {
            corporateId: corporate.id,
        },

        include: [

            {

                model: User,

                attributes: [

                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "phoneNumber",
                    "profilePicture",
                    "status",

                ],

            },

        ],

        order: [

            ["createdAt", "DESC"],

        ],

    });

};

export const getEmployeeService = async (
    corporateUserId,
    employeeId
) => {

    const corporate =
        await CorporateProfile.findOne({

            where: {
                userId: corporateUserId,
            },

        });

    if (!corporate) {

        throw new AppError(
            "Corporate profile not found.",
            404
        );

    }

    const employee =
        await CorporateEmployee.findOne({

            where: {

                id: employeeId,
                corporateId: corporate.id,

            },

            include: [

                {

                    model: User,

                    attributes: [

                        "id",
                        "firstName",
                        "lastName",
                        "email",
                        "phoneNumber",
                        "profilePicture",
                        "status",

                    ],

                },

            ],

        });

    if (!employee) {

        throw new AppError(
            "Employee not found.",
            404
        );

    }

    const totalTrips =
        await Booking.count({

            where: {

                passengerId: employee.userId,
                bookingStatus: "COMPLETED",

            },

        });

    const totalSpent =
        await Payment.sum("amount", {

            where: {

                userId: employee.userId,
                paymentStatus: "SUCCESS",

            },

        }) || 0;

    return {

        employee,

        stats: {

            totalTrips,

            totalSpent: Number(totalSpent),

        },

    };

};

export const updateEmployeeService = async (
    corporateUserId,
    employeeId,
    data
) => {

    const corporate =
        await CorporateProfile.findOne({

            where: {
                userId: corporateUserId,
            },

        });

    if (!corporate) {

        throw new AppError(
            "Corporate profile not found.",
            404
        );

    }

    const employee =
        await CorporateEmployee.findOne({

            where: {

                id: employeeId,
                corporateId: corporate.id,

            },

        });

    if (!employee) {

        throw new AppError(
            "Employee not found.",
            404
        );

    }

    await employee.update({

        department:
            data.department ??
            employee.department,

        employeeId:
            data.employeeId ??
            employee.employeeId,

        position:
            data.position ??
            employee.position,

        status:
            data.status ??
            employee.status,

    });

    return employee;

};

export const removeEmployeeService = async (
    corporateUserId,
    employeeId
) => {

    const corporate =
        await CorporateProfile.findOne({

            where: {
                userId: corporateUserId,
            },

        });

    if (!corporate) {

        throw new AppError(
            "Corporate profile not found.",
            404
        );

    }

    const employee =
        await CorporateEmployee.findOne({

            where: {

                id: employeeId,
                corporateId: corporate.id,

            },

        });

    if (!employee) {

        throw new AppError(
            "Employee not found.",
            404
        );

    }

    employee.status = "INACTIVE";

    await employee.save();

    return employee;

};
