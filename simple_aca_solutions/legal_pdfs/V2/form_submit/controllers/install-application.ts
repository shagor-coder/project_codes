import dotenv from "dotenv";
import { Request, Response } from "express";
import pLimit from "p-limit";

import chunk from "lodash/chunk";
import { createExpireDate } from "../helpers/create-check-expires";
import {
  getAccessTokenByCode,
  getLocationAccessTokenByAgencyToken,
  getLocationsByAgencyToken,
} from "../helpers/get-location-apis";
import { AgencyModel } from "../Models/Agency";
import { LocationModel } from "../Models/Location";

dotenv.config();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const installApplication = async (
  request: Request,
  response: Response
) => {
  try {
    const code = request.query.code as string;

    // Fetch API tokens and company details
    const apis = await getAccessTokenByCode(
      code,
      process.env.CLIENT_ID as string,
      process.env.CLIENT_SECRET as string
    );

    const existingAgency = await AgencyModel.findOne({
      where: { companyId: apis.companyId },
    });

    if (existingAgency) {
      return response.status(201).json({
        message: "Application already installed!!",
        companyId: apis.companyId,
      });
    }

    await AgencyModel.create({
      access_token: apis.access_token,
      companyId: apis.companyId,
      refresh_token: apis.refresh_token,
      expires_in: createExpireDate(apis.expires_in),
    });

    const locations = await getLocationsByAgencyToken(apis.access_token);

    if (!locations.length) {
      return response.status(404).json({
        message: "No locations found!!",
        companyId: apis.companyId,
      });
    }

    // Chunk locations into batches of 90
    const locationBatches = chunk(locations, 90);

    // Limit API calls to 100 per 10 seconds
    const limit = pLimit(100);

    // Function to process each batch
    const processBatch = async (batch: typeof locations) => {
      return Promise.all(
        batch.map((location: any) =>
          limit(() =>
            getLocationAccessTokenByAgencyToken(
              apis.access_token,
              location.id,
              apis.companyId
            )
          )
        )
      );
    };

    let allPromiseResults: any[] = [];
    let addLocationPromises: any[] = [];

    // Process each batch with a 10-second delay
    for (const batch of locationBatches) {
      const batchResults = await processBatch(batch);
      allPromiseResults = [...allPromiseResults, ...batchResults];
      await delay(10000);
    }

    // Filter successful results and save them to the database
    locations.forEach((location: any) => {
      const promiseResult = allPromiseResults.find(
        (result: any) => result?.locationId === location.id
      );
      if (promiseResult !== undefined) {
        addLocationPromises.push(
          LocationModel.create({
            locationId: location.id,
            companyId: apis.companyId,
            name: location.name,
            email: location.email,
            phone: location.phone,
            access_token: promiseResult?.access_token,
            refresh_token: promiseResult?.refresh_token,
            expires_in: createExpireDate(promiseResult?.expires_in),
          })
        );
      }
    });

    await Promise.all(addLocationPromises);

    return response.status(201).json({
      message: "Application installed successfully!!",
      companyId: apis.companyId,
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({ message: "Couldn't install application!!" });
  }
};
