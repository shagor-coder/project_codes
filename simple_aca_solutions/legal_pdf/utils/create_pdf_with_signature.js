const PdfPrinter = require('pdfmake');
const { default: axios } = require('axios');

async function createPdfWithSignature(req, res, next) {
	const {
		authorizationSignature,
		ip,
		full_name,
		phone,
		city,
		state,
		country,
		name,
	} = req.formatted_data;

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
			'\n',
			'\n',
			`I, ${full_name}, affirm that I have submitted my information to ${name} to sign up for, the federally regulated, $0 health insurance plan, on ${new Date().toDateString()}, and would like them to be my agent on record.`,

			'\n',
			'\n',
			'\n',
			'\n',

			{ image, width: 200, height: 120 },
			`${new Date().toDateString()}`,
			'\n',
			'\n',
			'\n',
			'By answering YES and confirming your information below, you attest to the following: 1.) This is a request to be enrolled in the best NO-COST plan in your area, based on our expertise of the market. 2) We will enroll you using the information provided in this form AND the minimum income to qualify. You MUST update your income with us within 30 days of enrollment; 3) This is a request to have AGENTS NAME or designee take over as your agent of record from this point forward, unless written notice is provided to AGENTS EMAIL. PLEASE ANSWER YES TO APPROVE OF THESE TERMS AND CONDITIONS',
		],
		defaultStyle: {
			font: 'Times',
			lineHeight: 1.6,
			fontSize: 12,
		},
	};

	var pdfDoc = printer.createPdfKitDocument(pdfDefinition);

	req.pdfDoc = pdfDoc;

	next();
}

module.exports = createPdfWithSignature;
