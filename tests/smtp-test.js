import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import transporter from "../src/config/mail.js";

console.log("HOST:", process.env.EMAIL_HOST);
console.log("PORT:", process.env.EMAIL_PORT);
console.log("USER:", process.env.EMAIL_USER);

try {
    await transporter.verify();
    console.log("SMTP Connected");
} catch (err) {
    console.error(err);
}