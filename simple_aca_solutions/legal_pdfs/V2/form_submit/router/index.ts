import express, { Router, Response, Request } from "express";
import path from "path";
import { formatWebhookRequest } from "../middlewares/format-webhook-request";
import { createPdfWithSignature } from "../middlewares/create-pdf-with-signature";
import { postPdfToContact } from "../controllers/post-pdf-to-contact";
import { hanldeWebhooks } from "../controllers/handle-webhook";
import { installApplication } from "../controllers/install-application";

const _Router: Router = express.Router();

_Router.get("/", (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "../public/index.html"));
});

_Router.get("/auth/callback", (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "../public/callback.html"));
});

// @ts-ignore
_Router.post("/api/app-install", installApplication);

_Router.post(
  "/create",
  formatWebhookRequest,
  createPdfWithSignature,
  postPdfToContact
);

// Handle Uninstall Events
// @ts-ignore
_Router.post("/api/handle-webhooks", hanldeWebhooks);

export default _Router;
