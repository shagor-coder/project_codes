const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../db/db_config");

const OpportunitySchema = sequelize.define(
  "Opportunities",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    contact_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opportunityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = OpportunitySchema;
