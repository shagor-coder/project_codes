const formatUserRequest = (request, response, next) => {
  try {
    const {
      "Sub-Account Name": locationName,
      "Sub-Account ID": locationId,
      "Admin Email": emailTo,
    } = request.body;

    if (!locationName || !locationId || !emailTo)
      return response
        .status(403)
        .json({ message: "On or more fields are missing" });

    request.formattedBody = {
      locationName: locationName,
      locationId: locationId,
      emailTo: emailTo,
    };
    next();
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = formatUserRequest;
