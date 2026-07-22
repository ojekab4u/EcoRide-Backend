import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
  },
  {
    timestamps: true,
  }
);

export default Wallet;