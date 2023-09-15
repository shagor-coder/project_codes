export default async function update_contact_tags(
	contact_id = '',
	tags = [],
	location_api_key = ''
) {
	const raw = {
		tags: tags,
	};

	const baseURL = `https://rest.gohighlevel.com/v1/contacts/${contact_id.trim()}/tags/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${location_api_key}`,
		},
		method: 'POST',
		body: JSON.stringify(raw),
		redirect: 'follow',
	};
	try {
		const request = await fetch(baseURL, config);
		const response = await request.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
}
