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
            "ACCEPTED",
            "REJECTED",
            "CANCELLED",
            "COMPLETED"
            ),
            defaultValue: "PENDING",
        },
        passengerAcknowledged: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        acknowledgedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        cancelledAt: {
            type: DataTypes.DATE,
        },

        cancelReason: {
            type: DataTypes.TEXT,
        },
        isRecurring: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        recurrenceDays: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        recurrenceStartDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        recurrenceEndDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        travelDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
     },
       
    {
        timestamps: true,
    }
);

export default Booking;