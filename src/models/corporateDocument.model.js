import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CorporateDocument = sequelize.define(
    "CorporateDocument",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        cacCertificate: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        taxCertificate: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        businessLicense: {
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

        corporateProfileId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

export default CorporateDocument;