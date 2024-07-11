const { raw } = require("express");
const createEmailTemplate = require("../helpers/create-template");
const {
  mailerSend,
  Recipient,
  EmailParams,
  Sender,
} = require("../helpers/mailer-send-instance");
const OpportunityModel = require("../models/Opportunity");
const UserModel = require("../models/User");

const sendEmailToAdmin = async (request, response) => {
  try {
    const locationId = request.query.locationId;

    const user = await UserModel.findOne({
      locationId: locationId,
      raw: true,
    });

    if (!user) return response.status(404).json({ message: "User not found!" });

    const opportunities = await OpportunityModel.findAll({
      raw: true,
      where: { locationId: locationId },
    });

    // if (!opportunities.length)
    //   return response.status(404).json({ message: "Opportunity not found!" });

    const recipients = [new Recipient(user.emailTo)];
    const sentFrom = new Sender(
      "contact@hotsheet.nurturebeast.com",
      "nurtureBeast"
    );

    const html = createEmailTemplate(opportunities);

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("nurtureBeast Hot Sheet")
      .setHtml(html);

    await mailerSend.email.send(emailParams);

    response.status(200).json({
      message: "Email sent successfully!",
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = sendEmailToAdmin;
