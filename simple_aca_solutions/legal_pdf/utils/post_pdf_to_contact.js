const { default: axios } = require('axios');
const FormData = require('form-data');
const stream = require('stream');

async function post_pdf_to_contact(request, response) {
	const { full_name, email, location_id, surveyId, surveypage_url } =
		request.formatted_data;
	const pdfDoc = request.pdfDoc;

	let fData = new FormData();

	const eventData = {
		source: 'direct',
		page: {
			url: surveypage_url,
			title: '$0 ACA/Health Coverage',
		},
		timestamp: new Date().getTime(),
		type: 'page-visit',
		domain: 'https://www.ushealthprogram.com/',
	};

	const fd = {
		full_name: full_name,
		email: email,
		formId: surveyId.trim(),
		location_id: location_id.trim(),
		eventData: eventData,
	};

	const pdfReadableStream = new stream.Readable();
	pdfReadableStream._read = () => {};
	pdfDoc.on('data', (chunk) => pdfReadableStream.push(chunk));
	pdfDoc.on('end', async () => {
		pdfReadableStream.push(null);

		try {
			fData.append('formData', JSON.stringify(fd));
			fData.append('survey_completed_doc', pdfReadableStream, {
				filename: `${full_name}.pdf`,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://services.leadconnectorhq.com/surveys/submit',
				headers: {
					...fData.getHeaders(),
				},
				data: fData,
			};

			const contact = await axios.request(config);
			console.log(contact.data);
			return contact;
		} catch (error) {
			console.log(error);
		}
	});
	pdfDoc.end();

	try {
		response.status(200).json({
			message: 'PDF creation and posting successful',
		});
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'An error occurred' });
	}
}

module.exports = post_pdf_to_contact;
