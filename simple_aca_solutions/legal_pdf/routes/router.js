const get_webhook_data = require('../middlewares/get_webhook_data');
const createPdfWithSignature = require('../utils/create_pdf_with_signature');
const post_pdf_to_contact = require('../utils/post_pdf_to_contact');
const Router = require('express').Router;

const Route = Router();

Route.post(
	'/create',
	get_webhook_data,
	createPdfWithSignature,
	post_pdf_to_contact
);

module.exports = Route;
