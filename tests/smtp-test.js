import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import transporter from "../src/config/mail.js";

try {
    await transporter.verify();   
} catch (err) {
    console.error(err);
}