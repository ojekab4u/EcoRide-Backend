import dotenv from "dotenv";
dotenv.config();
import sequelize from "../src/config/database.js";
import User from "../src/models/user.model.js";
import { hashPassword } from "../src/utils/hashPassword.js";

await sequelize.authenticate();

const hashedPassword = await hashPassword("Admin123@");

const existing = await User.findOne({
    where: {
        email: "admin@ecoride.com",
    },
});

if (existing) {
    console.log("Platform admin already exists.");
    process.exit();
}

await User.create({
    firstName: "Platform",
    lastName: "Admin",
    email: "admin@ecoride.com",
    phoneNumber: "08000000000",
    password: hashedPassword,

    role: "PLATFORM_ADMIN",

    emailVerified: true,
    phoneVerified: true,
    isVerified: true,
});

console.log("Platform admin created successfully.");

process.exit();