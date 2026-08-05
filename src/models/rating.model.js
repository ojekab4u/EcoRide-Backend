import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Rating = sequelize.define(
    "Rating",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        bookingId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        reviewerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        revieweeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        reviewerRole: {
            type: DataTypes.ENUM(
                "PASSENGER",
                "DRIVER"
            ),
            allowNull: false,
        },

        driverRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5,
            },
        },

        passengerRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5,
            },
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Rating;