import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "You're not allowed to access!"));

  jwt.verify(token, process.env.JWT_SECRET_STRING, (err, user) => {
    if (err) return next(createError(403, "Your token is invalid!"));

    if (req.params.id !== user.id)
      return next(createError(401, "Bad request!"));

    req.user = user;

    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "You're not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET_STRING, (err, user) => {
    if (err) return next(createError(403, "Your token is invalid!"));
    req.user = user;

    if (!req.user.isAdmin) next(createError(403, "Only admins can access!"));

    next();
  });
};