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
    response.status(500).json({ message: error.message });
  }
};

const clearOpportunities = async (request, response) => {
  try {
    const locationId = request.query.locationId;

    await OpportunityModel.destroy({
      where: { locationId: locationId },
    });

    response.status(200).json({
      message: "Opportunity cleared successfully",
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { addOpportunity, clearOpportunities };
