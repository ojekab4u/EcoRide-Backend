import {
    MailerSend,
    EmailParams,
    Sender,
    Recipient,
} from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const FROM_EMAIL =
    "noreply@test-r83ql3p82pmgzw1j.mlsender.net";

const FROM_NAME = "EcoRide";

export const sendOTPEmail = async (email, otp) => {
    try {
        const emailParams = new EmailParams()
            .setFrom(
                new Sender(FROM_EMAIL, FROM_NAME)
            )
            .setTo([
                new Recipient(email)
            ])
            .setSubject("Verify Your EcoRide Account")
            .setHtml(`
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <h2>Email Verification</h2>

                    <p>Welcome to EcoRide.</p>

                    <p>Your verification code is:</p>

                    <h1 style="letter-spacing: 8px; text-align: center;">
                        ${otp}
                    </h1>

                    <p>
                        This code expires in
                        <strong>10 minutes</strong>.
                    </p>

                    <p>
                        If you did not create an EcoRide account,
                        you can ignore this email.
                    </p>
                </div>
            `);

        const response =
            await mailerSend.email.send(emailParams);

        return response;
    } catch (error) {
        console.error(
            "MAILERSEND OTP ERROR:",
            error.body || error.message || error
        );

        throw new Error(
            "Failed to send OTP email."
        );
    }
};

export const sendResetEmail = async (
    email,
    resetToken
) => {
    try {
        const resetUrl =
            `${process.env.FRONTEND_URL || "http://localhost:3000"}` +
            `/ResetPassword.html?token=${resetToken}`;

        const emailParams = new EmailParams()
            .setFrom(
                new Sender(FROM_EMAIL, FROM_NAME)
            )
            .setTo([
                new Recipient(email)
            ])
            .setSubject("Reset Your EcoRide Password")
            .setHtml(`
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <h2>Reset Password</h2>

                    <p>
                        Click the button below to reset
                        your EcoRide password.
                    </p>

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

                    <p>
                        This link expires in
                        <strong>15 minutes</strong>.
                    </p>

                    <p>
                        If you did not request a password reset,
                        you can ignore this email.
                    </p>
                </div>
            `);

        const response =
            await mailerSend.email.send(emailParams);

        return response;
    } catch (error) {
        console.error(
            "MAILERSEND RESET EMAIL ERROR:",
            error.body || error.message || error
        );

        throw new Error(
            "Failed to send password reset email."
        );
    }
};