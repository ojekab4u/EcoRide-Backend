import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CorporateProfile = sequelize.define(
    "CorporateProfile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        rcNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        companyPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        companyAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        industry: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        companyLogo: {
            type: DataTypes.STRING,
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

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

export default CorporateProfile;