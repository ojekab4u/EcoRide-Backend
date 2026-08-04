import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification = sequelize.define(
    "Notification",
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

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM(
                "BOOKING",
                "RIDE",
                "PAYMENT",
                "WALLET",
                "SYSTEM",
                "CORPORATE"
            ),
            allowNull: false,
        },

        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        referenceId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Notification;