const { DataTypes } = require("sequelize");
const sequelize = require("../db/db_config");

const UserSchema = sequelize.define(
  "Users",
  {
    locationName: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    locationId: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    emailTo: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = UserSchema;
