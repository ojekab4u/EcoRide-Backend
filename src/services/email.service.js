import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
    const { data, error } = await resend.emails.send({
        from: "EcoRide <onboarding@resend.dev>",
        to: [email],
        subject: "Verify Your EcoRide Account",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Email Verification</h2>

                <p>Welcome to EcoRide.</p>

                <p>Your verification code is:</p>

                <h1 style="letter-spacing: 8px; text-align: center;">
                    ${otp}
                </h1>

                <p>This code expires in <strong>10 minutes</strong>.</p>

                <p>
                    If you did not create an EcoRide account,
                    you can ignore this email.
                </p>
            </div>
        `,
    });

    if (error) {
        console.error("RESEND OTP ERROR:", error);
        throw new Error(error.message || "Failed to send OTP email.");
    }

    return data;
};

export const sendResetEmail = async (email, resetToken) => {
    const resetUrl =
        `${process.env.API_BASE_URL || "http://localhost:3000"}` +
        `/api/v1/auth/reset-password/${resetToken}`;

    const { data, error } = await resend.emails.send({
        from: "EcoRide <onboarding@resend.dev>",
        to: [email],
        subject: "Reset Your EcoRide Password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Reset Password</h2>

                <p>Click the button below to reset your EcoRide password.</p>

                <a
                    href="${resetUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #000;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    "
                >
                    Reset Password
                </a>

                <p>This link expires in <strong>15 minutes</strong>.</p>
            </div>
        `,
    });

    if (error) {
        console.error("RESEND RESET EMAIL ERROR:", error);
        throw new Error(error.message || "Failed to send password reset email.");
    }

    return data;
};