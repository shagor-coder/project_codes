const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  contact_id: {
    type: "string",
    required: true,
  },
  first_name: {
    type: "string",
    required: true,
  },
  last_name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  opportunityType: {
    type: "string",
    required: true,
  },
  locationId: {
    type: "string",
    required: true,
  },
});

const OpportunityModel = mongoose.model("Opportunities", OpportunitySchema);

module.exports = OpportunityModel;
