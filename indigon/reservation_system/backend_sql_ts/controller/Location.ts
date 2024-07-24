import bcrypt from "bcrypt";
import { LocationModel, TableModel } from "../models";
import { RestaurantModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { getLocationAuthData } from "../utils/getLocationAuthData";
import { createError } from "../utils/error";

// Create a new Location
export const createLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const code = request.query.code as string;

    const data = await getLocationAuthData("authorization_code", code);

    if (!data) return next(createError(403, "Invalid authorization code"));

    const { access_token, refresh_token, expires_in, locationId } = data;

    await LocationModel.create({
      access_token: access_token as string,
      refresh_token: refresh_token as string,
      expires_in: new Date(expires_in),
      locationId: locationId as string,
      // @ts-ignore
      userId: request.user.id as string,
    });

    response.status(200).json({ status: "success", data: { locationId } });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get all locations under admin
export const getAllLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const locations = await LocationModel.findAll({
      // @ts-ignore
      where: { userId: request.user.id },
    });

    if (!locations.length) return next(createError(404, "Locations not found"));
    response.status(200).json({ staus: "success", data: locations });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get location for current user
export const getLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const locations = await LocationModel.findOne({
      // @ts-ignore
      where: { userId: request.user.id },
    });

    if (!locations) return next(createError(404, "Locations not found"));
    response.status(200).json({ staus: "success", data: locations });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Update current location
export const updateLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updatedLocation = await LocationModel.update(
      { id: request.params.id },
      { where: {} }
    );

    response.status(200).json({
      status: "success",
      message: "Location updated successfully!",
      data: "",
    });
  } catch (error) {
    next(createError(500, "Location not Updated"));
  }
};

// Delete current location
export const deleteLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await LocationModel.destroy({
      where: { id: request.params.id as string },
    });

    const deletedRestaurant = await RestaurantModel.findAll({
      where: { locationId: request.params.id as string },
    });

    let tableDeletePromises = [] as Promise<any>[];

    deletedRestaurant.forEach((rs) => {
      tableDeletePromises.push(
        rs.destroy(),
        TableModel.destroy({
          where: { restaurantId: rs.toJSON().id },
        })
      );
    });

    await Promise.all(tableDeletePromises);

    // const uploadedImagesId =
    //   locationResatuarant?.photos?.map((photos) => photos.photoId) || [];

    // locationResatuarant?.featuredImage
    //   ? uploadedImagesId.push(locationResatuarant.featuredImage?.photoId)
    //   : null;

    // locationResatuarant &&
    //   uploadedImagesId.length &&
    //   deletePhoto(uploadedImagesId);

    // locationResatuarant &&
    //   (await TableModel.findByIdAndDelete({
    //     restaurantId: locationResatuarant._id,
    //   }));

    response.status(200).json({
      status: "success",
      message: "Location deleted successfully!",
      data: { id: request.params.id as string },
    });
  } catch (error: any) {
    next(createError(500, "Location not Deleted"));
  }
};
