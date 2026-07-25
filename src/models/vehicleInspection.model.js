import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VehicleInspection = sequelize.define(
    "VehicleInspection",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        frontPhoto: {
            type: DataTypes.STRING,
        },

        rearPhoto: {
            type: DataTypes.STRING,
        },

        dashboardPhoto: {
            type: DataTypes.STRING,
        },

        odometerPhoto: {
            type: DataTypes.STRING,
        },

        tyrePhoto: {
            type: DataTypes.STRING,
        },

        safetyEquipmentPhoto: {
            type: DataTypes.STRING,
        },

        inspectionStatus: {
            type: DataTypes.ENUM(
                "PENDING",
                "PASSED",
                "FAILED"
            ),
            defaultValue: "PENDING",
        },

        reviewedAt: {
            type: DataTypes.DATE,
        },

        reviewNote: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true,
    }
);

export default VehicleInspection;