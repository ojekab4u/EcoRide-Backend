import { Op } from "sequelize";
import crypto from "crypto"
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
import { MESSAGES } from "../constants/messages.js";
import AppError from "../utils/AppError.js";
import generateResetToken from "../utils/generateResetToken.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResetEmail } from "./email.service.js";
import normalizeEnum from "../utils/normalizeEnum.js";



export const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    role,
  } = userData;
 
  if (userData.role) {
    userData.role = normalizeEnum(userData.role);
}

  // Check if email or phone already exists
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { phoneNumber },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError(MESSAGES.EMAIL_EXISTS, 409);
    }

    throw new AppError(MESSAGES.PHONE_EXISTS, 409);
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  // Generate JWT
  const token = generateToken(user);

  // Return response
  return {
    success: true,
    message: MESSAGES.REGISTER_SUCCESS,
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profilePicture: user.profilePicture,
      isVerified: user.isVerified,
      status: user.status,
      createdAt: user.createdAt,
    },
  };
};



// Login User
export const loginUser = async (userData) => {
  const { email, phoneNumber, password } = userData;

  const conditions = [];
  
  if (email) {
    conditions.push({ email });
  }
  if (phoneNumber) {
    conditions.push({ phoneNumber });
  }

  // Find user by email OR phone number
  const user = await User.findOne({
    where: {
      [Op.or]: conditions,
    },
  });

  if (!user) {
    throw new AppError(
      MESSAGES.INVALID_CREDENTIALS,
      401
    );
  }

  // Compare passwords
  const passwordMatch = await comparePassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError(
      MESSAGES.INVALID_CREDENTIALS,
      401
    );
  }

  // Update last login
  user.lastLogin = new Date();

  await user.save();

  // Generate JWT
  const token = generateToken(user);

  // Return response
  return {
    success: true,
    message: MESSAGES.LOGIN_SUCCESS,
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profilePicture: user.profilePicture,
      isVerified: user.isVerified,
      status: user.status,
      lastLogin: user.lastLogin,
    },
  };
};

export const changePassword = async (
    userId,
    userData
) => {

    const {
        currentPassword,
        newPassword,
    } = userData;

    const user = await User.findByPk(userId);

    if (!user) {
        throw new AppError(
            MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    const passwordMatch = await comparePassword(
        currentPassword,
        user.password
    );

    if (!passwordMatch) {

        throw new AppError(
            MESSAGES.INCORRECT_PASSWORD,
            401
        );

    }

    const hashedPassword =
        await hashPassword(newPassword);

    await user.update({
        password: hashedPassword,
        passwordChangedAt: new Date(),

    });

    return null;

};

export const forgotPasswordService = async (email) => {

    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        return;
    }

    const { resetToken, hashedToken } = generateResetToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(
        Date.now() + 15 * 60 * 1000
    );

    await user.save();
    await sendResetEmail(
    user.email,
    resetToken);
    return resetToken;
};

export const resetPasswordService = async (
    token,
    userData
) => {

    const {
        newPassword,
    } = userData;

    // Hash the token received from the URL
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find a user with this token that hasn't expired
    const user = await User.findOne({

        where: {

            passwordResetToken: hashedToken,

            passwordResetExpires: {
                [Op.gt]: new Date(),
            },

        },

    });

    if (!user) {

        throw new AppError(
            MESSAGES.INVALID_RESET_TOKEN,
            400
        );

    }

    // Hash the new password
    user.password = await hashPassword(newPassword);

    // Clear reset fields
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    // Force old JWTs to become invalid
    user.passwordChangedAt = new Date();

    await user.save();

};