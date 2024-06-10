const locationApiKey = '{{ custom_values.location_api }}';
const baseURL = 'https://rest.gohighlevel.com/v1/custom-values/';

const getCustomValues = async () => {
	const header = new Headers();
	header.append('Authorization', `Bearer ${locationApiKey}`);
	header.append('Content-Type', 'application/json');

	const requestOptions = {
		method: 'GET',
		headers: header,
		redirect: 'follow',
	};

	try {
		const request = await fetch(baseURL, requestOptions);
		const response = await request.json();
		const customValues = await response.customValues;
		return customValues;
	} catch (err) {
		console.log(err);
	}
};

export default getCustomValues;
