import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BankAccount = sequelize.define(
    "BankAccount",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        accountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
    }
);

export default BankAccount;