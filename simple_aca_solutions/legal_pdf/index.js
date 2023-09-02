const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const get_webhook_data = require('./middlewares/get_webhook_data');
const createPdfWithSignature = require('./utils/create_pdf_with_signature');
const post_pdf_to_contact = require('./utils/post_pdf_to_contact');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/create', async (request, response) => {
	try {
		get_webhook_data(request, response);
		await createPdfWithSignature(request, response);
		await post_pdf_to_contact(request, response);

		response.status(200).json({
			message: 'PDF Created!!!',
		});
	} catch (error) {
		response.status(500).json({
			message: 'PDF Create Failed!!!',
		});
	}
});

app.listen(PORT, HOST, () => {
	console.log(`Port running at http://localhost:${PORT}`);
});
