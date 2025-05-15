import axios from "axios";
import FormData from "form-data";
import stream from "stream";
import { Request, RequestHandler, Response } from "express";
import { LocationModel } from "../Models/Location";
import { updateContactById } from "../helpers/update-contact";

export const postPdfToContact: RequestHandler = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const {
      contact_id,
      full_name,
      location_id,
      upload_field_key,
      agent_termination_pdf,
    } =
      // @ts-ignore
      request.formattedData as {
        contact_id: string;
        full_name: string;
        location_id: string;
        upload_field_key: string;
        agent_termination_pdf: string;
      };

    // @ts-ignore
    const pdfDoc = request.pdfDoc as stream.PassThrough;

    if (!pdfDoc)
      response.status(400).json({ message: "No PDF document provided" });

    const fData = new FormData();

    fData.append(
      "contact",
      JSON.stringify({
        id: contact_id,
        data: {
          location_id: location_id,
        },
      })
    );

    const locationInfo = await LocationModel.findOne({
      where: { locationId: location_id },
    });

    if (!locationInfo)
      response.status(404).json({ message: "No location Found!" });

    const access_token = locationInfo?.toJSON().access_token as string;

    const data = new FormData();
    data.append(
      "id",
      `${contact_id}/${
        agent_termination_pdf ? agent_termination_pdf : upload_field_key
      }`
    );
    data.append("maxFiles", "1");

    // Convert PDF Stream to Buffer using Promise
    const finalPdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const pdfBuffer: Buffer[] = [];
      pdfDoc.on("data", (chunk) => pdfBuffer.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(pdfBuffer)));
      pdfDoc.on("error", reject);
      pdfDoc.end();
    });

    data.append("file", finalPdfBuffer, {
      filename: `${full_name}.pdf`,
      contentType: "application/pdf",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://services.leadconnectorhq.com/locations/${location_id}/customFields/upload`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        Version: "2021-07-28",
        ...data.getHeaders(),
      },
      data: data,
    };

    const { data: uploadData } = await axios.request(config);

    const updateContact = await updateContactById(
      access_token,
      contact_id,
      agent_termination_pdf
        ? "agent_termination_pdf_url"
        : "final_attestation_pdf_url",
      uploadData.meta[0].url
    );
    response
      .status(200)
      .json({ message: "Upload successful!", result: updateContact });
  } catch (error: any) {
    if (!response.headersSent) {
      response.status(500).json({
        message: "Error Posting PDF",
        error: error?.response?.data || error.message,
      });
    }
  }
};
