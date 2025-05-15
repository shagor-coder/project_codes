import express, { Router, Response, Request } from "express";
import path from "path";
import { formatWebhookRequest } from "../middlewares/format-webhook-request";
import { createPdfWithSignature } from "../middlewares/create-pdf-with-signature";
import { postPdfToContact } from "../controllers/post-pdf-to-contact";
import { createPdfWithSignatureAgent } from "../middlewares/create-pdf-with-signature-agent";
import { checkExpireDateForLocation } from "../middlewares/check-expire-date";

const _Router: Router = express.Router();

_Router.get("/", (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "../public/index.html"));
});

_Router.post(
  "/create",
  checkExpireDateForLocation,
  formatWebhookRequest,
  createPdfWithSignature,
  postPdfToContact
);

_Router.post(
  "/agent",
  checkExpireDateForLocation,
  formatWebhookRequest,
  createPdfWithSignatureAgent,
  postPdfToContact
);

export default _Router;
