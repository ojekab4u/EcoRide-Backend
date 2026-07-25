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

        yearsOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        preferredVehicleType: {
            type: DataTypes.ENUM(
                "SEDAN",
                "SUV",
                "MINIBUS",
                "TRUCK",
                "BIKE"
            ),
            allowNull: true,
        },

        verificationStatus: {
            type: DataTypes.ENUM(
                "PENDING",
                "APPROVED",
                "REJECTED"
            ),
            defaultValue: "PENDING",
        },

        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        profileCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    }
);

export default DriverProfile;