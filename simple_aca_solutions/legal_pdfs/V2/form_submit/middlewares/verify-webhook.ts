import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { appConfig } from "../config/db.config";

export const verifyWebhookSignature = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signature = req.headers["x-wh-signature"] as string;
    const secret = appConfig.webhook_signature;
    if (!signature)
      return res.status(401).json({ message: "No singnature found!" });

    const payload =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const verifier = crypto.createVerify("SHA256");
    verifier.update(payload);
    verifier.end();

    const isValid = verifier.verify(secret, signature, "base64");

    if (!isValid)
      return res.status(401).json({ message: "No valid singnature found!" });

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
