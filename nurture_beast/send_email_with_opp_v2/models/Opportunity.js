const { DataTypes } = require("sequelize");
const sequelize = require("../db/db_config");

const OpportunitySchema = sequelize.define(
  "Opportunities",
  {
    contact_id: {
      type: DataTypes.STRING,
      required: true,
    },
    first_name: {
      type: DataTypes.STRING,
      required: true,
    },
    last_name: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    opportunityType: {
      type: DataTypes.STRING,
      required: true,
    },
    locationId: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = OpportunitySchema;
