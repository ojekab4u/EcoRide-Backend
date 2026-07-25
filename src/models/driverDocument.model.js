import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DriverDocument = sequelize.define(
    "DriverDocument",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        nationalIdUrl: {
            type: DataTypes.STRING,
        },

        driverLicenseUrl: {
            type: DataTypes.STRING,
        },

        vehicleRegistrationUrl: {
            type: DataTypes.STRING,
        },

        insuranceCertificateUrl: {
            type: DataTypes.STRING,
        },

        selfieUrl: {
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

        verifiedAt: {
            type: DataTypes.DATE,
        },

        verificationNote: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true,
    }
);

export default DriverDocument;