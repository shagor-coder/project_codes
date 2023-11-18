async function updatePurchasedContact(apiKey, body, id) {
	const header = new Headers();
	header.append('Authorization', `Bearer ${apiKey}`);
	header.append('Content-Type', 'application/json');

	const updateOptions = {
		method: 'PUT',
		headers: header,
		body: JSON.stringify(body),
		redirect: 'follow',
	};

	console.log(updateOptions);

	try {
		const request = await fetch(
			`https://rest.gohighlevel.com/v1/contacts/${id}`,
			updateOptions
		);

		const response = await request.json();

		return response;
	} catch (error) {
		console.log(error.message);
	}
}

export default updatePurchasedContact;
