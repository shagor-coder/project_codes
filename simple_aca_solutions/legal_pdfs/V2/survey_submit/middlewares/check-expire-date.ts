import { NextFunction, Request, Response } from "express";
import {
  checkExpiresDate,
  createExpireDate,
} from "../helpers/create-check-expires";
import { getAccessTokenByRefresh } from "../helpers/get-location-apis";
import { LocationModel } from "../Models/Location";
import { RequestHandler } from "express-serve-static-core";

type RequestBody = {
  contact_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    fullAddress: string;
    id: string;
  };
};

type ApiResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  locationId: string;
  companyId: string;
};

export const checkExpireDateForLocation: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = request.body as RequestBody;
    if (!body.contact_id || !body.location.id) {
      response.status(401).json({ message: "No contact id provided." });
      return;
    }

    const data = await LocationModel.findOne({
      where: { locationId: body.location.id as string },
      raw: true,
    });

    if (!data) {
      response.status(404).json({ message: "No location found!!" });
      return;
    }

    // @ts-ignore
    const { expires_in, refresh_token } = data;
    const isExpired = checkExpiresDate(expires_in);

    if (isExpired) {
      try {
        const newApiData: ApiResponse = await getAccessTokenByRefresh(
          refresh_token,
          process.env.CLIENT_ID as string,
          process.env.CLIENT_SECRET as string
        );

        await LocationModel.update(
          {
            access_token: newApiData.access_token,
            expires_in: createExpireDate(newApiData.expires_in),
            refresh_token: newApiData.refresh_token,
          },
          { where: { locationId: body.location.id as string } }
        );
        next();
      } catch (error: any) {
        console.log(error);
        response
          .status(500)
          .json({ message: "Something went wrong" + error.message });
        return;
      }
    } else {
      next();
    }
  } catch (error: any) {
    console.log(error);
    response.status(error.status).json({ message: error.message });
  }
};
