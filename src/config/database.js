
import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
    
        await import("../models/index.js");

        await sequelize.sync({
        alter: true,
        });

        
    } catch (error) {
      
    }
};

export default sequelize;