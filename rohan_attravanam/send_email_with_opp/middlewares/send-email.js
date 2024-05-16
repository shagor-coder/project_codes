const db = require("../firebase/app");

const sendEmailToAdmin = async (request, response) => {
  try {
    const user = request.user;
    const opportunities = request.opportunities;

    response.status(200).json({
      message: "User successfully queued for",
      data: { user: user, opportunities: opportunities },
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = sendEmailToAdmin;
