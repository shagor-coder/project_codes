const db = require("../firebase/app");
const createEmailTemplate = require("../helpers/create-template");
const {
  mailerSend,
  Recipient,
  EmailParams,
  Sender,
} = require("../helpers/mailer-send-instance");

const sendEmailToAdmin = async (request, response) => {
  try {
    const user = request.user;
    const opportunities = request.opportunities;
    const recipients = [new Recipient(user.emailTo)];
    const sentFrom = new Sender(
      "contact@trial-zr6ke4nj879gon12.mlsender.net",
      "Shagor Hossain"
    );

    const html = createEmailTemplate(opportunities);

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Nurture Beast Hot Sheet")
      .setHtml(html);

    await mailerSend.email.send(emailParams);

    response.status(200).json({
      message: "Email sent successfully!",
    });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!!" });
    console.log(error);
  }
};

module.exports = sendEmailToAdmin;
