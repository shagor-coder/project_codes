const PdfPrinter = require("pdfmake");
const { default: axios } = require("axios");

async function createPdfWithAgentSignature(request, response) {
  try {
    const { authorizationSignature, full_name } = request.formatted_data;

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
        `Revocation of Consent for ${full_name}`,
        "\n",
        "\n",
        "\n",
        `${new Date().toDateString()} I ${full_name} am officially informing you or any agents connected with your company or agency that I no longer permit you in any matter to access my information in my Marketplace plan. This also includes any previously given consent you or your agency may have in assisting me in getting health insurance.  Please remove my information from your system.`,
        "\n",
        "\n",
        `Thank You`,
        "\n",
        "\n",
        { image, width: 200, height: 120 },
        "\n",
        `${full_name}`,
        `${new Date().toDateString()}`,
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
    throw new Error("Failed to create PDF!!");
  }
}

module.exports = createPdfWithAgentSignature;
