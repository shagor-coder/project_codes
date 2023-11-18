const agencyAPIKEY = '{{ custom_values.agency_api }}';
const userBaseURL = 'https://rest.gohighlevel.com/v1/users/';

const getUserById = async (id) => {
	const header = new Headers();
	header.append('Authorization', `Bearer ${agencyAPIKEY}`);
	header.append('Content-Type', 'application/json');

	const requestOptions = {
		method: 'GET',
		headers: header,
		redirect: 'follow',
	};

	try {
		const request = await fetch(`${userBaseURL}${id.trim()}`, requestOptions);
		const response = await request.json();
		return response;
	} catch (err) {
		console.log(err);
	}
};
export default getUserById;
