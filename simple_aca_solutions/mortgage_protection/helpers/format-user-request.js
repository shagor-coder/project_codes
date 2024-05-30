const formatUserRequest = (request, response, next) => {
  try {
    const {
      "Sub-Account Name": locationName,
      "Sub-Account ID": locationId,
      "Admin Email": emailTo,
      "Account Email": emailFrom,
    } = request.body;

    if (!locationName || !locationId || !emailTo || !emailFrom)
      return response
        .status(403)
        .json({ message: "On or more fields are missing" });

    request.formattedBody = {
      locationName: locationName,
      locationId: locationId,
      emailTo: emailTo,
      emailFrom: emailFrom,
    };
    next();
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = formatUserRequest;
