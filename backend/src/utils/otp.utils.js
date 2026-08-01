const emailService = require("../services/email.service");

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);

    return otp;
}

async function sendOTP(email, otp) {
    const subject = "FeedCV - Verify Your Email";

    const text = `
Welcome to FeedCV!

Your One-Time Password (OTP) is: ${otp}

This OTP is valid for 10 minutes.

Do not share this code with anyone. FeedCV will never ask for your OTP.

If you did not request this verification, you can safely ignore this email.

Regards,
FeedCV Team
`;

    const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">FeedCV</h2>
            <p style="margin: 5px 0 0;">Email Verification</p>
        </div>

        <div style="padding: 30px;">
            <h3>Hello!</h3>

            <p>Thank you for signing up for <strong>FeedCV</strong>.</p>

            <p>Please use the following One-Time Password (OTP) to verify your email address:</p>

            <div style="
                background: #f3f4f6;
                border: 1px dashed #2563eb;
                border-radius: 6px;
                padding: 18px;
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #2563eb;
                margin: 25px 0;
            ">
                ${otp}
            </div>

            <p><strong>This OTP is valid for 10 minutes.</strong></p>

            <p style="color: #dc2626;">
                Never share this code with anyone. FeedCV will never ask for your OTP.
            </p>

            <p>If you didn't request this verification, you can safely ignore this email.</p>

            <br>

            <p>Best regards,<br><strong>FeedCV Team</strong></p>
        </div>

        <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} FeedCV. All rights reserved.
        </div>

    </div>
    `;

    await emailService.sendEmail(email, subject, text, html);
}


module.exports = {
    generateOTP,
    sendOTP
}