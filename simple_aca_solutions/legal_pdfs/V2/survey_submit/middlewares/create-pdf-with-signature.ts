import { NextFunction, Request, Response } from "express";
import { default as axios } from "axios";
import PdfPrinter from "pdfmake";
import { createTextsFromCustomFields } from "../helpers/create-texts-from-custom-fields";

export const createPdfWithSignature = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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
      agent_termination_pdf,
      ...rest
      //   @ts-ignore
    } = request.formattedData as any;

    const textsForCustomFields = createTextsFromCustomFields({ ...rest });

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
        `Device IP: ${ip}`,
        "\n",
        "\n",
        `I, ${full_name}, affirm that I have submitted my information to ${name} to sign up for, the federally regulated, $0 health insurance plan, on ${new Date().toDateString()}, and would like them to be my agent on record.`,
        "\n",
        "\n",
        `${textsForCustomFields}`,
        "\n",
        "\n",
        { image, width: 200, height: 120 },
        `${new Date().toDateString()}`,
        "\n",
        "\n",
        `I give my permission to ${agent_name} to serve as my health insurance agent for myself and my entire household if applicable, for purposes of enrollment in a Qualified Health Plan offered on the Federally Facilitated Marketplace. By consenting to this agreement, I authorize the above-mentioned agent to view and use the confidential information provided by me in writing, electronically, or by telephone only for the purposes of one or more of the following
			\n
			1. Searching for an existing Marketplace application.
			\n
			2. Completing an application for eligibility and enrollment in a Marketplace Qualified Health Plan or other government insurance affordability programs, such as Medicaid and CHIP or advance tax credits to help pay for Marketplace premiums.
			\n
			3. Providing ongoing account maintenance and enrollment assistance, as necessary.
			\n
			4. Responding to inquiries from the Marketplace regarding my Marketplace application.
			\n
			5. If you already have a Marketplace plan, you give permission to switch you to a better plan if one is available, if you are already on the best plan possible you are requesting ${agent_name} to take over as your agent of record from this point forward unless notified of a change.
			\n
			6. I agree that if I am making less than 100% of the federal poverty line that I am looking for work making at least minimum wage.
			\n
			I understand that the agent will not use or share my personal identifiable information (PII) for any purposes other than those listed above. The Agent will ensure my PII is kept private and safe when collecting, starting, and using my PII for stated purposes above. I confirm that the information I provided for entry on my Marketplace eligibility and enrollment application will be true to the best of my knowledge. I understand that I do not have to share additional personal information about myself or my health with my Agent beyond what is required on the application for eligibility and enrollment purposes. I understand that my consent remains in effect until I revoke it, and I may revoke or notify my consent at any time by sending an email, text, or phone call to ${agent_name} at ${agent_phone_number}
			\n
			Name of Primary Writing Agent: ${agent_name}
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
    (request as any).pdfDoc = pdfDoc;
    next();
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "PDF creation failed!", error: error });
  }
};
