import { selectRoleService } from "../services/selectRole.service.js";
import { successResponse } from "../utils/response.js";

export const selectRole = async (
    req,
    res,
    next
) => {
    try {

        const user = await selectRoleService(
            req.user.id,
            req.body.role
        );

        return successResponse(
            res,
            200,
            "Role selected successfully.",
            user
        );

    } catch (error) {
        console.log(error);
    console.log(error.errors);
        next(error);
    }
};