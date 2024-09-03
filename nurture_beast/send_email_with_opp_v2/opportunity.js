const OpportunityModel = require("../models/Opportunity");

const addOpportunity = async (request, response) => {
  try {
    const {
      contact_id,
      first_name,
      last_name,
      email,
      opportunityType,
      locationId,
    } = request.formattedBody;

    const opportunity = new OpportunityModel({
      contact_id,
      first_name,
      last_name,
      email,
      opportunityType,
      locationId,
    });

    const savedOpportunity = await opportunity.save();

    response.status(200).json({
      message: "Opportunity added successfully",
      data: savedOpportunity,
    });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

const clearOpportunities = async (request, response) => {
  try {
    const locationId = request.query.locationId;

    await OpportunityModel.find({
      locationId: locationId,
    }).deleteMany();

    response.status(200).json({
      message: "Opportunity cleared successfully",
    });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { addOpportunity, clearOpportunities };
