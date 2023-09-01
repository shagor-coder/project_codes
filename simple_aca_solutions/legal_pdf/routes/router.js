const get_webhook_data = require('../middlewares/get_webhook_data');
const createPdfWithSignature = require('../utils/create_pdf_with_signature');
const post_pdf_to_contact = require('../utils/post_pdf_to_contact');
const Router = require('express').Router;

const Route = Router();

Route.post('/create', get_webhook_data, async (request, response) => {
	try {
		await createPdfWithSignature(request, response);
		await post_pdf_to_contact(request, response);
		response.status(200).json({
			message: 'PDF creation and posting successful',
		});
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'An error occurred' });
	}
});

module.exports = Route;
