import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Wallet = sequelize.define("Wallet", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },

    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
});
export default Wallet;