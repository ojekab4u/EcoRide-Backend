import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WalletTransaction = sequelize.define(
    "WalletTransaction",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        walletId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        paymentId: {
            type: DataTypes.UUID,
            allowNull: true,
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM(
                "TOP_UP",
                "BOOKING_PAYMENT",
                "TRIP_EARNING",
                "REFUND",
                "COMMISSION"
            ),
            allowNull: false,
        },

        transactionType: {
            type: DataTypes.ENUM(
                "CREDIT",
                "DEBIT"
            ),
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);

export default WalletTransaction;