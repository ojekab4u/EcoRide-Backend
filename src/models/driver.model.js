import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DriverProfile = sequelize.define(
  "DriverProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    licenseExpiry: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    verificationStatus: {
      type: DataTypes.ENUM(
        "PENDING",
        "APPROVED",
        "REJECTED"
      ),
      defaultValue: "PENDING",
    },

    bio: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default DriverProfile;