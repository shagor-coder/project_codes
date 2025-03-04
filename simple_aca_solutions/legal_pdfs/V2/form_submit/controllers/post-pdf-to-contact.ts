import axios from "axios";
import FormData from "form-data";
import stream from "stream";
import { Request, Response } from "express";

export const postPdfToContact = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const {
      full_name,
      email,
      location_id,
      surveyId,
      surveypage_url,
      upload_field_key,
      // @ts-ignore
    } = request.formattedData as any;

    // @ts-ignore
    const pdfDoc = request.pdfDoc as stream.PassThrough;

    if (!pdfDoc) {
      response.status(400).json({ message: "No PDF document provided" });
      return;
    }

    let fData = new FormData();

    const eventData = {
      source: "direct",
      page: {
        url: surveypage_url,
        title: "$0 ACA/Health Coverage",
      },
      timestamp: Date.now(),
      type: "page-visit",
      domain: "https://www.ushealthprogram.com/",
      medium: "survey",
      mediumId: surveyId.trim(),
    };

    const fd = {
      full_name: full_name,
      email: email,
      formId: surveyId.trim(),
      location_id: location_id.trim(),
      eventData: eventData,
    };

    // Convert PDF Stream to Buffer using Promise
    const finalPdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const pdfBuffer: Buffer[] = [];
      pdfDoc.on("data", (chunk) => pdfBuffer.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(pdfBuffer)));
      pdfDoc.on("error", reject);
      pdfDoc.end();
    });

    fData.append(upload_field_key || "file", finalPdfBuffer, {
      filename: `${full_name}.pdf`,
      contentType: "application/pdf",
    });

    fData.append("formData", JSON.stringify(fd));

    try {
      const config = {
        method: "post" as const,
        maxBodyLength: 2000000, // Adjusted for Node 14 shared hosting limits
        url: "https://backend.leadconnectorhq.com/surveys/submit",
        headers: {
          ...fData.getHeaders(),
          "Content-Length": fData.getLengthSync(),
        },
        data: fData,
        timeout: 15000,
      };

      const { data, ...rest } = await axios.request(config);

      response.status(200).json({
        message: "Contact Updated!!",
        data: data.contact.id,
        limit: rest.headers,
      });
    } catch (error: any) {
      console.error("🚨 Error Posting PDF:", error);
      if (!response.headersSent) {
        response
          .status(500)
          .json({ message: "Error Posting PDF!!", error: error.message });
      }
    }
  } catch (error: any) {
    console.error("Error Posting PDF:", error.message);
    if (!response.headersSent) {
      response
        .status(500)
        .json({ message: "Error Posting PDF!!", error: error.message });
    }
  }
};
