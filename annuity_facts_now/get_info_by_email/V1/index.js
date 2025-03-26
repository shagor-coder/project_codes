const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const get_webhook_data = require('./middlewares/get_webhook_data');
const get_info_by_email = require('./middlewares/get_info_by_email');
const process_atd_info = require('./middlewares/process_atd_info');
const update_contact_info = require('./middlewares/update_contact_info');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/get-info', async (request, response) => {
	get_webhook_data(request, response);
	await get_info_by_email(request, response);
	process_atd_info(request, response);
	await update_contact_info(request, response);
});

app.listen(PORT, HOST, () => {
	console.log(`Port running at http://localhost:${PORT}`);
});
