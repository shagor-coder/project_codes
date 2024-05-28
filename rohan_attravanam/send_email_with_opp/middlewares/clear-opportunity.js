const db = require("../firebase/app");

const clearOpportunities = async (request, response) => {
  try {
    const locationId = request.query.locationId;
    if (!locationId)
      return response.status(4043).json({ message: "No Location provided!" });

    const querySnapshot = await db
      .collection("opportunities")
      .where("locationId", "==", locationId.toString().trim())
      .get();

    if (querySnapshot.empty)
      return response.status(404).json({ message: "No Opportunity Found!" });

    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    response.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};

module.exports = clearOpportunities;
