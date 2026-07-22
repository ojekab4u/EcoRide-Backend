import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ride = sequelize.define(
  "Ride",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pickupLatitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },

    pickupLongitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },

    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    destinationLatitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },

    destinationLongitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },

    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    pricePerSeat: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "SCHEDULED",
        "ONGOING",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "SCHEDULED",
    },
  },
  {
    timestamps: true,
  }
);

export default Ride;