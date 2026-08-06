import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CorporateEmployee = sequelize.define(
    "CorporateEmployee",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        status: {
            type: DataTypes.ENUM(
                "ACTIVE",
                "INACTIVE"
            ),
            defaultValue: "ACTIVE",
        },

        department: {
            type: DataTypes.STRING,
        },

        employeeId: {
            type: DataTypes.STRING,
        },

        position: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);

export default CorporateEmployee;