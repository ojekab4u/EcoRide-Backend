import transporter from "../config/mail.js";

export const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"EcoRide" <${process.env.EMAIL_USER}>`,
        to: email,
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

                <p>If you did not create an EcoRide account, you can ignore this email.</p>
            </div>
        `,
    });
};

export const sendResetEmail = async (email, resetToken) => {
    const resetUrl = `http://localhost:3000/api/v1/auth/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: `"EcoRide" <${process.env.EMAIL_USER}>`,
        to: email,
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
};