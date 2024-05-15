const createUser = (request, response) => {
  try {
    const { locationName, locationId, emailTo, emailFrom } =
      request.formattedBody;

    response.status(200).json({ message: "User created successfully" });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = createUser;
