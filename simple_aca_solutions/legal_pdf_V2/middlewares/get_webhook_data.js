const filter_empty_custom_fields = require('../utils/filter_empty_custom_fields');

function get_webhook_data(req, res) {
	const {
		contact_id,
		full_name,
		email,
		phone,
		city,
		state,
		country,
		'Sign Below': authorizationSignature,
		contact,
		location,
		customData,
		...rest
	} = req.body;

	const filtered_custom_fields = filter_empty_custom_fields({ ...rest });

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
		...filtered_custom_fields,
	};
	req.formatted_data = formatted_data;
}
module.exports = get_webhook_data;