import transporter from "../config/mail.js";

export const sendResetEmail = async (email, resetToken) => {

    const resetUrl = `http://localhost:3000/api/v1/auth/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: `"EcoRide Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your EcoRide Password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
                <h2>Reset Your Password</h2>

                <p>Hello,</p>

                <p>
                    We received a request to reset your EcoRide password.
                </p>

                <p>
                    Click the button below to reset your password:
                </p>

                <p>
                    <a
                        href="${resetUrl}"
                        style="
                            background:#16a34a;
                            color:white;
                            padding:12px 24px;
                            text-decoration:none;
                            border-radius:6px;
                            display:inline-block;
                        "
                    >
                        Reset Password
                    </a>
                </p>

                <p>
                    This link will expire in
                    <strong>15 minutes</strong>.
                </p>

                <p>
                    If you did not request a password reset,
                    please ignore this email.
                </p>

                <hr>

                <small>
                    EcoRide Team
                </small>
            </div>
        `,
    });

};


export const sendOTPEmail = async (email, otp) => {

    await transporter.sendMail({
        from: `"EcoRide Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your EcoRide Account",
        html: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
                <h2>Email Verification</h2>

                <p>Hello,</p>

                <p>
                    Welcome to EcoRide.
                </p>

                <p>
                    Use the verification code below to verify your email address.
                </p>

                <div
                    style="
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:8px;
                        text-align:center;
                        padding:20px;
                        margin:20px 0;
                        background:#f5f5f5;
                        border-radius:8px;
                    "
                >
                    ${otp}
                </div>

                <p>
                    This code will expire in
                    <strong>10 minutes</strong>.
                </p>

                <p>
                    If you did not create an EcoRide account,
                    you can safely ignore this email.
                </p>

                <hr>

                <small>
                    EcoRide Team
                </small>
            </div>
        `,
    });

};