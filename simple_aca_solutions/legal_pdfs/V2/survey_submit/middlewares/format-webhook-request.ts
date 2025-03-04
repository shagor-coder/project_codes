import { NextFunction, Request, Response } from "express";
import { filterEmptyCustomFields } from "../helpers/filter-empty-custom-fields";

export const formatWebhookRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    contact_id,
    full_name,
    email,
    phone,
    city,
    state,
    country,
    "Sign Below": authorizationSignature,
    contact,
    location,
    customData,
    ...rest
  } = request.body;

  const filteredCustomFields = filterEmptyCustomFields({ ...rest });

  const { ip } = contact.lastAttributionSource && contact.lastAttributionSource;
  const { name, id: location_id } = location;
  const {
    surveyId,
    surveypage_url,
    agent_name,
    agent_phone_number,
    national_producer_number,
    agent_email,
    upload_field_key,
    agent_termination_pdf,
  } = customData;

  if (
    !contact_id ||
    !full_name ||
    !email ||
    !phone ||
    !city ||
    !state ||
    !country ||
    !authorizationSignature ||
    !contact ||
    !location ||
    !customData ||
    !ip ||
    !surveyId ||
    !surveypage_url ||
    !upload_field_key
  ) {
    response
      .status(400)
      .json({ error: "One or more required fields are missing in req.body" });
  }

  const formattedData = {
    authorizationSignature,
    ip,
    contact_id,
    full_name,
    email,
    phone,
    city,
    state,
    country,
    name,
    location_id,
    surveyId,
    surveypage_url,
    agent_name,
    agent_phone_number,
    national_producer_number,
    agent_email,
    upload_field_key,
    agent_termination_pdf,
    ...filteredCustomFields,
  };

  (request as any).formattedData = formattedData;
  next();
};
