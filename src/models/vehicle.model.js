import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Vehicle = sequelize.define(
    "Vehicle",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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

        frontImage: {
            type: DataTypes.STRING,
        },

        rearImage: {
            type: DataTypes.STRING,
        },

        leftImage: {
            type: DataTypes.STRING,
        },

        rightImage: {
            type: DataTypes.STRING,
        },

        interiorImage: {
            type: DataTypes.STRING,
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
        },
    },
    {
        timestamps: true,
    }
);

export default Vehicle;