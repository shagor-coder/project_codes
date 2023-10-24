const PdfPrinter = require('pdfmake');
const { default: axios } = require('axios');
const create_text_from_custom_fields = require('./create_text_from_fields');

async function createPdfWithSignature(req, res) {
	const {
		authorizationSignature,
		ip,
		full_name,
		phone,
		city,
		state,
		country,
		name,
		contact_id,
		email,
		location_id,
		surveyId,
		surveypage_url,
		...rest
	} = req.formatted_data;

	const texts_for_custom_fields = create_text_from_custom_fields({ ...rest });

	const imageResponse = await axios.get(authorizationSignature.url, {
		responseType: 'arraybuffer',
	});
	const imageBuffer = await imageResponse.data;

	const image =
		'data:image/png;base64,' + Buffer.from(imageBuffer).toString('base64');

	const fonts = {
		Courier: {
			normal: 'Courier',
			bold: 'Courier-Bold',
			italics: 'Courier-Oblique',
			bolditalics: 'Courier-BoldOblique',
		},
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
			italics: 'Helvetica-Oblique',
			bolditalics: 'Helvetica-BoldOblique',
		},
		Times: {
			normal: 'Times-Roman',
			bold: 'Times-Bold',
			italics: 'Times-Italic',
			bolditalics: 'Times-BoldItalic',
		},
		Symbol: {
			normal: 'Symbol',
		},
		ZapfDingbats: {
			normal: 'ZapfDingbats',
		},
	};

	const printer = new PdfPrinter(fonts);

	const pdfDefinition = {
		content: [
			`Date: ${new Date().toDateString()}`,
			`Device IP: ${ip}`,
			'\n',
			'\n',
			`I, ${full_name}, affirm that I have submitted my information to ${name} to sign up for, the federally regulated, $0 health insurance plan, on ${new Date().toDateString()}, and would like them to be my agent on record.`,
			'\n',
			'\n',
			`${texts_for_custom_fields}`,
			'\n',
			'\n',
			{ image, width: 200, height: 120 },
			`${new Date().toDateString()}`,
			'\n',
			'\n',
			'By answering YES and confirming your information below, you attest to the following: 1.) This is a request to be enrolled in the best NO-COST plan in your area, based on our expertise of the market. 2) We will enroll you using the information provided in this form AND the minimum income to qualify. You MUST update your income with us within 30 days of enrollment; 3) This is a request to have AGENTS NAME or designee take over as your agent of record from this point forward, unless written notice is provided to AGENTS EMAIL. PLEASE ANSWER YES TO APPROVE OF THESE TERMS AND CONDITIONS',
		],
		defaultStyle: {
			font: 'Helvetica',
			lineHeight: 1.4,
			fontSize: 10,
		},
	};

	var pdfDoc = printer.createPdfKitDocument(pdfDefinition);

	req.pdfDoc = pdfDoc;
}

module.exports = createPdfWithSignature;
