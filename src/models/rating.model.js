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

    driverRating: {
      type: DataTypes.INTEGER,
    },

    passengerRating: {
      type: DataTypes.INTEGER,
    },

    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default Rating;