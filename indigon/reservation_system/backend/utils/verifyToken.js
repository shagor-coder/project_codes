import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "You're not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET_STRING, (err, user) => {
    if (err) return next(createError(403, "Your token is invalid!"));

    if (!user.isAdmin && user.id !== req.params.id)
      return next(createError(401, "Bad request!"));

    if (user.isAdmin && req.params.companyId !== user.companyId)
      return next(createError(401, "Bad request!"));

    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "You're not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET_STRING, (err, user) => {
    if (err) return next(createError(403, "Your token is invalid!"));

    if (!user.isAdmin) return next(createError(403, "Only admins can access!"));

    if (user.companyId !== req.params.companyId)
      return next(createError(401, "Bad request!"));

    next();
  });
};
