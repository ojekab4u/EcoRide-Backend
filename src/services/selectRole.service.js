import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";

export const selectRoleService = async (
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

    if (user.role !== ROLES.UNASSIGNED) {
        throw new AppError(
            "Role has already been selected.",
            409
        );
    }

    role = role?.trim().toUpperCase();

    if (
        ![
            ROLES.DRIVER,
            ROLES.PASSENGER,
            ROLES.CORPORATE_ADMIN,
        ].includes(role)
    ) {
        throw new AppError(
            "You can only select DRIVER or PASSENGER.",
            400
        );
    }

    user.role = role;

    await user.save();

    return user;
};