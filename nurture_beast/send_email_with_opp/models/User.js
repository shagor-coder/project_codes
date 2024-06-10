const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  locationName: {
    type: "string",
    required: true,
    unique: true,
  },
  locationId: {
    type: "string",
    required: true,
    unique: true,
  },
  emailTo: {
    type: "string",
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
