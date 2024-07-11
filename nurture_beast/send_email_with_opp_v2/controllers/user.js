const UserModel = require("../models/User");

const createUser = async (request, response) => {
  try {
    const { locationName, locationId, emailTo } = request.formattedBody;

    const user = new UserModel({
      locationName,
      locationId,
      emailTo,
    });

    const savedUser = await user.save();

    response.status(200).json({
      message: "User added successfully",
      data: savedUser,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { createUser };
