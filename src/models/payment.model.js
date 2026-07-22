import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.ENUM(
        "CARD",
        "BANK_TRANSFER",
        "WALLET"
      ),
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM(
        "PENDING",
        "SUCCESS",
        "FAILED",
        "REFUNDED"
      ),
      defaultValue: "PENDING",
    },

    transactionReference: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Payment;