import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { VERIFICATION_STATUS } from "../constants/verificationStatus.js";

const DriverDocument = sequelize.define(
    "DriverDocument",
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

        nationalIdUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        driverLicenseUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        vehicleRegistrationUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        insuranceCertificateUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        selfieUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        verificationStatus: {
            type: DataTypes.ENUM(
                ...Object.values(VERIFICATION_STATUS)
            ),
            defaultValue: VERIFICATION_STATUS.PENDING,
        },

        verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        verificationNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

export default DriverDocument;