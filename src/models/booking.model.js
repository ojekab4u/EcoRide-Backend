import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Booking = sequelize.define(
    "Booking",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        passengerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        rideId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        bookingReference: {
            type: DataTypes.STRING,
            unique: true,
        },

        numberOfSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        fare: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },

        bookingStatus: {
            type: DataTypes.ENUM(
                "PENDING",
                "CONFIRMED",
                "REJECTED",
                "CANCELLED",
                "COMPLETED"
            ),
            defaultValue: "PENDING",
        },

        cancelledAt: {
            type: DataTypes.DATE,
        },

        cancelReason: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true,
    }
);

export default Booking;