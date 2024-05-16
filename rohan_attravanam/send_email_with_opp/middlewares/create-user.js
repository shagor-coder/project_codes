const db = require("../firebase/app.js");

const createUser = async (request, response) => {
  try {
    const { locationName, locationId, emailTo, emailFrom } =
      request.formattedBody;

    const docRef = db.collection("users").doc();

    await docRef.set({
      locationName: locationName,
      locationId: locationId,
      emailTo: emailTo,
      emailFrom: emailFrom,
    });

    response.status(200).json({
      message: "User added successfully",
      data: { ...request.formattedBody, id: docRef.id },
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = createUser;
