import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PassengerProfile = sequelize.define(
    "PassengerProfile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        gender: {
            type: DataTypes.ENUM(
                "MALE",
                "FEMALE",
                "OTHER"
            ),
            allowNull: false,
        },

        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        occupation: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        homeLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        officeLocation: {
            type: DataTypes.STRING,
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

export default PassengerProfile;