function get_webhook_data(req, res) {
  const { first_name, last_name, email, location, customData } = req.body;

  if (!first_name || !last_name || !email || !location || !customData) {
    return res
      .status(400)
      .json({ error: "One or more required fields are missing in req.body" });
  }

  const { name: location_name, id: location_id } = location;

  const { surveyId, checkout_page } = customData;

  const formatted_data = {
    first_name,
    last_name,
    email,
    location_name,
    location_id,
    surveyId,
    checkout_page,
  };
  req.formatted_data = formatted_data;
}
module.exports = get_webhook_data;
