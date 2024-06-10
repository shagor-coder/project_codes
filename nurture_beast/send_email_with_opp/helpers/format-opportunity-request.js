const formatOpportunityRequest = (request, response, next) => {
  try {
    const {
      contact_id,
      first_name,
      last_name,
      email,
      "Opportunity Type": opportunityType,
      location,
    } = request.body;

    if (
      !contact_id ||
      !first_name ||
      !last_name ||
      !email ||
      !opportunityType ||
      !location
    )
      return response
        .status(403)
        .json({ message: "On or more fields are missing" });

    request.formattedBody = {
      contact_id: contact_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      opportunityType: opportunityType,
      locationId: location.id ? location.id : "",
    };
    next();
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = formatOpportunityRequest;
