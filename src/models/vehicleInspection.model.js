import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { INSPECTION_STATUS } from "../constants/inspectionStatus.js";

const VehicleInspection = sequelize.define(
    "VehicleInspection",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        vehicleId: {
            type: DataTypes.UUID,
            allowNull: false,
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
        ...Object.values(INSPECTION_STATUS)
            ),
            defaultValue: INSPECTION_STATUS.PENDING,
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