const dotenv = require("dotenv");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

dotenv.config();

const mailerSend = new MailerSend({
  apiKey: process.env.NODEMAILER_API_KEY,
});

module.exports = { EmailParams, Sender, Recipient, mailerSend };
