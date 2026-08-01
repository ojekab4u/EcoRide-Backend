import { brevo } from "../config/brevo.js";

export const sendOTPEmail = async (email, otp) => {
    await brevo.post("/smtp/email", {
        sender: {
            name: "EcoRide",
            email: process.env.SENDER_EMAIL,
        },

        to: [
            {
                email,
            },
        ],

        subject: "Verify Your EcoRide Account",

        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
                <h2>Email Verification</h2>

                <p>Welcome to EcoRide.</p>

                <p>Your verification code is:</p>

                <h1 style="letter-spacing:8px; text-align:center;">
                    ${otp}
                </h1>

                <p>This code expires in <strong>10 minutes</strong>.</p>
            </div>
        `,
    });
};

export const sendResetEmail = async (email, resetToken) => {

    const resetUrl = `http://localhost:3000/api/v1/auth/reset-password/${resetToken}`;

    await brevo.post("/smtp/email", {
        sender: {
            name: "EcoRide",
            email: process.env.SENDER_EMAIL,
        },

        to: [
            {
                email,
            },
        ],

        subject: "Reset Your EcoRide Password",

        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">

                <h2>Reset Password</h2>

                <p>Click the link below to reset your password.</p>

                <a href="${resetUrl}">
                    Reset Password
                </a>

                <p>This link expires in <strong>15 minutes</strong>.</p>

            </div>
        `,
    });
};