function get_webhook_data(req, res, next) {
	const {
		contact_id,
		full_name,
		email,
		phone,
		city,
		state,
		country,
		'Authorization Signature': authorizationSignature,
		contact,
		location,
		customData,
	} = req.body;

	const { ip } = contact.lastAttributionSource && contact.lastAttributionSource;
	const { name, id: location_id } = location;
	const { surveyId, surveypage_url } = customData;

	if (
		!contact_id ||
		!full_name ||
		!email ||
		!phone ||
		!city ||
		!state ||
		!country ||
		!authorizationSignature ||
		!contact ||
		!location ||
		!customData ||
		!ip ||
		!surveyId ||
		!surveypage_url
	) {
		return res
			.status(400)
			.json({ error: 'One or more required fields are missing in req.body' });
	}

	const formatted_data = {
		authorizationSignature,
		ip,
		contact_id,
		full_name,
		email,
		phone,
		city,
		state,
		country,
		name,
		location_id,
		surveyId,
		surveypage_url,
	};

	console.log(formatted_data);

	req.formatted_data = formatted_data;
	next();
}
module.exports = get_webhook_data;
