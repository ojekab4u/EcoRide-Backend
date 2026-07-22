import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Booking = sequelize.define( 
    "Booking",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        numberOfSeats:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        bookingStatus: {
            type: DataTypes.ENUM(
            "PENDING",
            "CONFIRMED",
            "CANCELLED",
            "COMPLETED"
            ),
            defaultValue: "PENDING",
        },
    },
    {timestamps: true,}
);

export default Booking;