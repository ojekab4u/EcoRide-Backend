import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();

        console.log("Database connected successfully.");

        await import("../models/index.js");

        await sequelize.sync({
            alter: false,
        });

        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};

export default sequelize;