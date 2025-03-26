import { Request, Response } from "express";
import {
  getAccessTokenByRefresh,
  getLocationAccessTokenByAgencyToken,
  getLocationByAgencyToken,
} from "../helpers/get-location-apis";
import { createExpireDate } from "../helpers/create-check-expires";
import { AgencyModel } from "../Models/Agency";
import { LocationModel } from "../Models/Location";

type LocationAppUninstallRequest = {
  type: string;
  appId: string;
  locationId: string;
  companyId: string;
  installType: string;
};

type ApiResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  companyId: string;
};

type LocationInfoResponse = {
  locationId: string;
  companyId: string;
  name: string;
  email: string;
  phone: string;
};

const handleInstallLocation = async (companyId: string, locationId: string) => {
  try {
    const agencyData = await AgencyModel.findOne({
      where: { companyId: companyId },
    });

    if (!agencyData?.toJSON()) {
      throw new Error("Couldn't find the agency!!");
    }

    const apis: ApiResponse = await getAccessTokenByRefresh(
      agencyData?.toJSON().refresh_token as string,
      process.env.CLIENT_ID as string,
      process.env.CLIENT_SECRET as string
    );

    await AgencyModel.update(
      {
        access_token: apis.access_token,
        refresh_token: apis.refresh_token,
        expires_in: createExpireDate(apis.expires_in),
      },
      {
        where: { companyId: companyId },
      }
    );

    const locationInfo: LocationInfoResponse = await getLocationByAgencyToken(
      apis.access_token as string,
      locationId as string
    );

    const locationAPIs: ApiResponse = await getLocationAccessTokenByAgencyToken(
      apis.access_token as string,
      locationId as string,
      companyId as string
    );

    await LocationModel.create({
      locationId: locationId as string,
      companyId: companyId as string,
      name: locationInfo.name as string,
      email: locationInfo.email as string,
      phone: locationInfo.phone as string,
      access_token: locationAPIs.access_token as string,
      refresh_token: locationAPIs.refresh_token as string,
      expires_in: createExpireDate(locationAPIs.expires_in),
    });

    return locationInfo;
  } catch (error: any) {
    throw error;
  }
};

export const hanldeWebhooks = async (request: Request, response: Response) => {
  try {
    const { locationId, companyId, type, installType } =
      request.body as LocationAppUninstallRequest;

    if (type === "INSTALL" && installType === "Location") {
      const isLocationInstalled = await LocationModel.findOne({
        where: { locationId: locationId },
      });

      if (isLocationInstalled?.toJSON())
        return response
          .status(201)
          .json({ message: "Location already installed" });

      await handleInstallLocation(companyId, locationId);
      return response.status(201).json({ message: "Location created!" });
    }

    if (type !== "UNINSTALL")
      return response.status(404).json({ message: "No handler registered!!" });

    if (type === "UNINSTALL" && companyId) {
      await AgencyModel.destroy({
        where: { companyId: companyId },
      });
      await LocationModel.destroy({
        where: { companyId: companyId },
      });
      return response.status(200).json({
        message: "Agency successfully deleted!",
      });
    } else if (type === "UNINSTALL" && !companyId) {
      await LocationModel.destroy({
        where: { locationId: locationId },
      });
      return response.status(200).json({
        message: "Location successfully deleted!",
      });
    }
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};
