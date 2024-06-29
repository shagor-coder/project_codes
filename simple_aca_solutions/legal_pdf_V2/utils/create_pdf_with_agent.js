const PdfPrinter = require("pdfmake");
const { default: axios } = require("axios");

async function createPdfWithAgentSignature(request, response) {
  try {
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
      agent_name,
      agent_phone_number,
      national_producer_number,
      agent_email,
      upload_field_key,
    } = request.formatted_data;

    const imageResponse = await axios.get(authorizationSignature.url, {
      responseType: "arraybuffer",
    });
    const imageBuffer = await imageResponse.data;

    const image =
      "data:image/png;base64," + Buffer.from(imageBuffer).toString("base64");

    const fonts = {
      Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique",
      },
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
      Times: {
        normal: "Times-Roman",
        bold: "Times-Bold",
        italics: "Times-Italic",
        bolditalics: "Times-BoldItalic",
      },
      Symbol: {
        normal: "Symbol",
      },
      ZapfDingbats: {
        normal: "ZapfDingbats",
      },
    };

    const printer = new PdfPrinter(fonts);

    const pdfDefinition = {
      content: [
        `Date: ${new Date().toDateString()}`,

        `Name of Primary Writing Agent: ${agent_name}
			Agent National Producer Number: ${national_producer_number}
			Phone Number: ${agent_phone_number}
			Email Address: ${agent_email}`,
      ],
      defaultStyle: {
        font: "Helvetica",
        lineHeight: 1.4,
        fontSize: 10,
      },
    };

    var pdfDoc = printer.createPdfKitDocument(pdfDefinition);
    request.pdfDoc = pdfDoc;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create PDF!!");
  }
}

module.exports = createPdfWithSignature;
