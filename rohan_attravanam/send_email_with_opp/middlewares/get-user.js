const db = require("../firebase/app");

const getUser = async (request, response, next) => {
  try {
    const locationId = request.query.locationId;
    const userRef = db.collection("users");
    const userSnapshot = await userRef
      .where("locationId", "==", locationId.toString().trim())
      .get();
    if (userSnapshot.empty)
      return response.status(404).json({ message: "User not found" });

    const userDoc = userSnapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };
    request.user = user;

    next();
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = getUser;
