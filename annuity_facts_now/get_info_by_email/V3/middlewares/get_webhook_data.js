function get_webhook_data(req, res, next) {
  const {
    first_name,
    last_name,
    email,
    location,
    customData,
    contact_id: id,
  } = req.body;

  if (!first_name || !email || !location || !customData) {
    return res
      .status(400)
      .json({ error: "One or more required fields are missing in req.body" });
  }

  const { name: location_name, id: location_id } = location;

  const { surveyId, checkout_page, location_api_key } = customData;

  const formatted_data = {
    id,
    first_name,
    last_name,
    email,
    location_name,
    location_id,
    surveyId,
    checkout_page,
    location_api_key,
  };
  req.formatted_data = formatted_data;
  next();
}
module.exports = get_webhook_data;
