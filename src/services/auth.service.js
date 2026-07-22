import { Op } from "sequelize";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
import { generateToken } from "../utils/generateToken.js";
import { MESSAGES } from "../constants/messages.js";
import AppError from "../utils/AppError.js";



export const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    role,
  } = userData;
  const normalizedRole = role
  ? role.toUpperCase() : "PASSENGER";

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
    role: normalizedRole,
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