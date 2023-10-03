const FormData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY
});

const sendWelcomeEmail = async (toEmail) => {
  const data = {
    from: process.env.MAILGUN_SENDER,
    to: toEmail,
    subject: "Welcome to Our Company!",
    text: "Thank you for your registration!",
  };
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

const sendPasswordResetEmail = async (toEmail, resetLink) => {
  const data = {
    from: process.env.MAILGUN_SENDER,
    to: toEmail,
    subject: "Password Reset Request",
    text: `To reset your password please click on the following link: ${resetLink}`,
  };
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log("Password reset email sent successfully");
  } catch (err) {
    console.log("Error sending password reset email:", err);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail
};