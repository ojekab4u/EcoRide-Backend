import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    family: 4,

    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("SMTP ERROR:", error);
    } else {
        console.log("SMTP Ready");
    }
});

export default transporter;