const db = require("../firebase/app.js");

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

    const docRef = db.collection("opportunities").doc();

    await docRef.set({
      contact_id: contact_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      opportunityType: opportunityType,
      locationId,
    });

    response.status(200).json({
      message: "Opportunity added successfully",
      data: { ...request.formattedBody, id: docRef.id },
    });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = addOpportunity;
