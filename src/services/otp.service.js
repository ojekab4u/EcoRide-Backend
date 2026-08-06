import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import generateOTP from "../utils/generateOTP.js";
import { sendOTPEmail } from "./email.service.js";
import {sendSMS} from "./sms.service.js"

export const sendEmailOTPService = async (email) => {

    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    // remove previous otp
    await OTP.destroy({
        where: {
            userId: user.id,
            purpose: "EMAIL_VERIFICATION",
        },
    });

    const code = generateOTP();

    await OTP.create({
        userId: user.id,
        code,
        purpose: "EMAIL_VERIFICATION",
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
try {
    await sendOTPEmail(user.email, code);
} catch (error) {
   
}

    return;
};

export const verifyEmailOTPService = async (
    email,
    code
) => {

    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    const otp = await OTP.findOne({
        where: {
            userId: user.id,
            code,
            purpose: "EMAIL_VERIFICATION",
        },
    });

    if (!otp) {
        throw new AppError(
            "Invalid OTP.",
            400
        );
    }

    if (otp.expiresAt < new Date()) {

        await otp.destroy();

        throw new AppError(
            "OTP has expired.",
            400
        );
    }

    user.emailVerified = true;

    await user.save();

    await otp.destroy();

    return user;
};

export const sendPhoneOTPService = async (
    phoneNumber
) => {

    const user = await User.findOne({
        where: { phoneNumber },
    });

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    await OTP.destroy({
        where: {
            userId: user.id,
            purpose: "PHONE_VERIFICATION",
        },
    });

    const code = generateOTP();

    await OTP.create({
        userId: user.id,
        code,
        purpose: "PHONE_VERIFICATION",
        expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
        ),
    });

    // await sendSMS(phoneNumber, code);
};

export const verifyPhoneOTPService = async (
    phoneNumber,
    code
) => {
    const user = await User.findOne({
        where: { phoneNumber },
    });
    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }
    const otp = await OTP.findOne({
        where: {
            userId: user.id,
            code,
            purpose: "PHONE_VERIFICATION",
        },
    });
    if (!otp) {
        throw new AppError(
            "Invalid OTP.",
            400
        );
    }
    if (otp.expiresAt < new Date()) {

        await otp.destroy();

        throw new AppError(
            "OTP expired.",
            400
        );
    }

    user.phoneVerified = true;
    await user.save();
    await otp.destroy();
    return user;
};
