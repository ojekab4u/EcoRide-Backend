import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OTP = sequelize.define(
    "OTP",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        purpose: {
            type: DataTypes.ENUM(
                "EMAIL_VERIFICATION",
                "PASSWORD_RESET",
                "PHONE_VERIFICATION"
            ),
            allowNull: false,
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    }
);

export default OTP;