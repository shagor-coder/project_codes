const { default: axios } = require('axios');

async function get_info_by_email(request, response) {
	const { email } = request.formatted_data;

	const request_url = `https://api.atdata.com/v5/eppend?email=${email.trim()}&api_key=${
		process.env.API_KEY
	}`;

	try {
		let config = {
			method: 'post',
			url: request_url,
			headers: {
				'content-type': 'application/json',
			},
		};
		const info = await axios.request(config);
		return (request.atd_response_data = info.data);
	} catch (error) {
		return response.status(500).json({
			message: 'No Info Was Found!!',
		});
	}
}

module.exports = get_info_by_email;
