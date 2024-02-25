const { default: axios } = require("axios");
const FormData = require("form-data");
const stream = require("stream");

async function post_pdf_to_contact(request, response) {
  try {
    const {
      full_name,
      email,
      location_id,
      surveyId,
      surveypage_url,
      upload_field_key,
    } = request.formatted_data;

    const pdfDoc = request.pdfDoc;

    let fData = new FormData();

    const eventData = {
      source: "direct",
      page: {
        url: surveypage_url,
        title: "$0 ACA/Health Coverage",
      },
      timestamp: new Date().getTime(),
      type: "page-visit",
      domain: "https://www.ushealthprogram.com/",
    };

    const fd = {
      full_name: full_name,
      email: email,
      formId: surveyId.trim(),
      location_id: location_id.trim(),
      eventData: eventData,
    };

    const pdfReadableStream = new stream.Readable();
    pdfReadableStream._read = () => {};
    pdfDoc.on("data", (chunk) => pdfReadableStream.push(chunk));
    pdfDoc.on("end", async () => {
      pdfReadableStream.push(null);
      try {
        fData.append(upload_field_key, pdfReadableStream, {
          filename: `${full_name}.pdf`,
          contentType: "application/pdf",
        });

        fData.append("formData", JSON.stringify(fd));

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://services.leadconnectorhq.com/surveys/submit",
          headers: {
            ...fData.getHeaders(),
          },
          data: fData,
        };

        const contact = await axios.request(config);

        if (!response.headersSent)
          response
            .status(200)
            .json({ message: "Contact Updated!!", contact: contact.data });
      } catch (error) {
        console.log(error);
        throw new Error("Error posting PDF to contact");
      }
    });
    pdfDoc.end();
  } catch (error) {
    console.log(error);
    throw new Error("Error posting PDF to contact");
  }
}

module.exports = post_pdf_to_contact;
