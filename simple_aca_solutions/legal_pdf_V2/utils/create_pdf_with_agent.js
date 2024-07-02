const PdfPrinter = require("pdfmake");
const { default: axios } = require("axios");

async function createPdfWithAgentSignature(request, response) {
  try {
    const { authorizationSignature, name, agent_name } = request.formatted_data;

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
        `Agent/Agency Termination Request`,
        "\n",
        "\n",
        "\n",

        `From ${name}`,
        `${new Date().toDateString()}`,
        "\n",
        "\n",
        `To ${agent_name}`,
        "\n",
        "\n",
        `Hello ${agent_name}. Thank you for your previous assistance. I have choosen to proceed with another agent named ${agent_name}, for my marketplace Health Insurance application. Please ensure all my personal information is deleted and refrain from accessing my marketplace application.`,
        "\n",
        "\n",
        `Best Regards`,
        { image, width: 200, height: 120 },
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
    console.log(error);
    throw new Error("Failed to create PDF!!");
  }
}

module.exports = createPdfWithAgentSignature;
