import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EmergencyContact = sequelize.define(
    "EmergencyContact",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        relationship: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

export default EmergencyContact;