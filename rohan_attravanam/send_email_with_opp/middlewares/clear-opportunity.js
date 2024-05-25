const db = require("../firebase/app");

const clearOpportunities = async (request, response) => {
  try {
    const { location } = request.body;
    if (!location)
      return response.status(4043).json({ message: "No Location provided!" });
    const { id: locationId } = location;
    await db
      .collection("opportunities")
      .doc("locationId", "==", locationId.toString().trim())
      .delete();

    response.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = clearOpportunities;
