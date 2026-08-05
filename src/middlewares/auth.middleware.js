import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../errors/AppError.js";


const protect = async (req, res, next) => {

    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        if (!token) {
            throw new AppError("Not authorized.", 401);
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findByPk(decoded.id, {
            attributes: {
                exclude: [ "password",
            "passwordResetToken",
            "passwordResetExpires",
            "passwordChangedAt",
            "lastLogin",],
            },
        });

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        
        if (user.passwordChangedAt) {

            const passwordChangedTime = Math.floor(
                new Date(user.passwordChangedAt).getTime() / 1000
            );

            if (passwordChangedTime > decoded.iat) {

                throw new AppError(
                    "Password was changed recently. Please log in again.",
                    401
                );

            }

        }
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }

};

export const authenticate = async (
    req,
    res,
    next
) => {

    try {

        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return next(
                new AppError(
                    "Authentication required.",
                    401
                )
            );

        }

        const token =
            authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findByPk(
            decoded.id
        );

        if (!user) {

            return next(
                new AppError(
                    "User not found.",
                    404
                )
            );

        }

        req.user = user;

        next();

    } catch (error) {

        return next(
            new AppError(
                "Invalid or expired token.",
                401
            )
        );

    }

};
export default protect;