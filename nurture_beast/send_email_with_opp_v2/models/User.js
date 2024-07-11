const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../db/db_config");

const UserSchema = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emailTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = UserSchema;
