import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { VERIFICATION_STATUS } from "../constants/verificationStatus.js";

const PassengerDocument = sequelize.define(
    "PassengerDocument",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        nationalIdFront: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        nationalIdBack: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        selfie: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        verificationStatus: {
            type: DataTypes.ENUM(
                ...Object.values(VERIFICATION_STATUS)
            ),
            defaultValue: VERIFICATION_STATUS.PENDING,
        },

        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        uploadedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: true,
    }
);

export default PassengerDocument;