import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        "PASSENGER",
        "DRIVER",
        "CORPORATE_ADMIN",
        "PLATFORM_ADMIN"
      ),
      defaultValue: "PASSENGER",
    },

    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "ACTIVE",
        "SUSPENDED",
        "DEACTIVATED"
      ),
      defaultValue: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default User;