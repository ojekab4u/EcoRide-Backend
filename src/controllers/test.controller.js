import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { sendOTPEmail, sendResetEmail } from "../services/email.service.js";

export const uploadTest = async (req, res) => {
    try {
        const imageUrl = await uploadToCloudinary(
            req.file.path,
            "EcoRide/Test"
        );

        res.status(200).json({
            success: true,
            imageUrl,
        });

    } catch (error) {      
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const testEmail = async (req, res) => {
    const { email, type } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
    }

    try {
        if (type === "reset") {
            await sendResetEmail(email, "test-reset-token");
        } else {
            await sendOTPEmail(email, "123456");
        }

        res.status(200).json({
            success: true,
            message: `Test ${type || "otp"} email sent successfully to ${email}`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error.body || error.response?.data || null,
        });
    }
};