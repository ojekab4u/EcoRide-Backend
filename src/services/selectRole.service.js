import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

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

    if (user.role !== "UNASSIGNED") {
        throw new AppError(
            "Role has already been selected.",
            409
        );
    }

    user.role = role;

    await user.save();

    return user;
};