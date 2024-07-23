import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "./error";

export const verifyUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies.access_token;

  if (!token) return next(createError(401, "You're not authenticated!"));

  jwt.verify(
    token,
    process.env.JWT_SERVER_STRING as string,
    (err: any, user: any) => {
      if (err) return next(createError(403, "Your token is invalid!"));

      request.user = user;
      next();
    }
  );
};

export const verifyAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies.access_token;

  if (!token) return next(createError(401, "You're not authenticated!"));

  jwt.verify(
    token,
    process.env.JWT_SERVER_STRING as string,
    (err: any, user: any) => {
      if (err) return next(createError(403, "Your token is invalid!"));
      if (!user.isAdmin)
        return next(createError(403, "Only admins can access!"));
      request.user = user;
      next();
    }
  );
};
