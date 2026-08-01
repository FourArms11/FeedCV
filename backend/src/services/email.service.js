const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.EMAIL_USER,
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
    if (error.response) {
      console.error("SMTP response:", error.response);
    }
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_DISPLAY_NAME || "Bank Transaction System"}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error("SMTP response:", error.response);
    }
    throw error;
  }
};

module.exports = {
  sendEmail,
};
