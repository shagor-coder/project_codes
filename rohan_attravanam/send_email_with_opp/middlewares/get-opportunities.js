const db = require("../firebase/app");

const getOpportunities = async (request, response, next) => {
  try {
    const locationId = request.query.locationId;

    const opportunitiesRef = db.collection("opportunities");

    const opportunitiesSnapshot = await opportunitiesRef
      .where("locationId", "==", locationId.toString().trim())
      .get();

    if (opportunitiesSnapshot.empty)
      return response.status(404).json({ message: "Opportunities not found" });

    let opportunities = [];

    opportunitiesSnapshot.forEach((snapshot) => {
      let opportunity = {};

      opportunity = {
        id: snapshot.id,
        ...snapshot.data(),
      };

      opportunities.push(opportunity);
    });

    request.opportunities = opportunities;

    next();
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = getOpportunities;
