import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { VERIFICATION_STATUS } from "../constants/verificationStatus.js";

const Vehicle = sequelize.define(
    "Vehicle",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        driverId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        plateNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        vehicleType: {
            type: DataTypes.ENUM(
                "SEDAN",
                "SUV",
                "MINIBUS",
                "TRUCK",
                "BIKE"
            ),
            allowNull: false,
        },

        seatCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        verificationStatus: {
            type: DataTypes.ENUM(
                ...Object.values(VERIFICATION_STATUS)
        ),
        defaultValue: VERIFICATION_STATUS.PENDING,
    },
        vehicleImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Vehicle;