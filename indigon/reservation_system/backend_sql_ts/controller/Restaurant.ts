import { AssetsModel } from "../models";
import { RestaurantModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { deletePhoto, uploadPhoto } from "../utils/clodinary";
import { createError } from "../utils/error";

type RequestBody = {
  name: string;
  description: string;
  addressLine: string;
  openingHours: string;
  closingHours: string;
  priceRange: string;
  bookingDuration: string;
};

// Create a new Restaurant
export const createRestaurant = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body as RequestBody;

  try {
    // @ts-ignore
    const photos = request.files["photos"] || [];
    // @ts-ignore
    const featuredImages = request.files["featuredImage"] || [];
    const photoURLs = [] as {
      photoURL: string;
      photoId: string;
      isFeatured: boolean;
    }[];
    let photoURLPromises = [] as Promise<any>[];

    const uploadPhotos = async () => {
      await Promise.all(
        photos?.map(async (file: any) => {
          const result = await uploadPhoto(file);
          // @ts-ignore
          photoURLs.push({ ...result, isFeatured: false });
        })
      );
    };

    const uploadFeaturedImage = async () => {
      await Promise.all(
        featuredImages?.map(async (file: any) => {
          const result = await uploadPhoto(file);
          // @ts-ignore
          photoURLs.push({ ...result, isFeatured: true });
        })
      );
    };

    photos && (await uploadPhotos());

    featuredImages && (await uploadFeaturedImage());

    // Create new Restaurant document with photo URLs
    const newRestaurantBody = {
      ...body,
      // @ts-ignore
      userId: request.user.id as string,
      locationId: request.params.locationId,
    };

    const newRestaurant = await RestaurantModel.create(newRestaurantBody);

    photoURLs?.forEach((photoObj) => {
      photoURLPromises.push(
        AssetsModel.create({
          isFeatured: photoObj?.isFeatured,
          photoId: photoObj?.photoId as string,
          photoURL: photoObj?.photoURL as string,
          restaurantId: newRestaurant.toJSON().id as string,
        })
      );
    });

    await Promise.all(photoURLPromises);

    response.status(200).json({
      status: "success",
      message: "Restaurant added!",
      data: newRestaurant.toJSON(),
    });
  } catch (error: any) {
    console.log(error);

    next(createError(500, error.message as string));
  }
};

// Get all Restaurants under admin
export const getAllRestaurant = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await RestaurantModel.findAll({
      where: { locationId: request.params.locationId as string },
      nest: true,
      include: [
        {
          model: AssetsModel,
          as: "assets",
        },
      ],
    });

    if (!restaurants.length)
      return next(createError(404, "Restaurants not found"));
    response.status(200).json({ staus: "success", data: restaurants });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get Restaurant for current user
export const getRestaurantForAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await RestaurantModel.findByPk(
      request.params.id as string,
      {
        nest: true,
        include: [
          {
            model: AssetsModel,
            as: "assets",
            attributes: {
              exclude: ["updatedAt", "createdAt"],
            },
          },
        ],
      }
    );
    if (!restaurant) return next(createError(404, "Restaurant not found"));
    response.status(200).json({ staus: "success", data: restaurant.toJSON() });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get Restaurant for web
export const getRestaurantForWeb = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await RestaurantModel.findByPk(
      request.params.id as string,
      {
        nest: true,
        include: [
          {
            model: AssetsModel,
            as: "assets",
            attributes: {
              exclude: [
                "updatedAt",
                "createdAt",
                "id",
                "restaurantId",
                "photoId",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
      }
    );
    if (!restaurant) return next(createError(404, "Restaurant not found"));
    response.status(200).json({ staus: "success", data: restaurant.toJSON() });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Update current Restaurant
export const updateRestaurant = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = request.body as RequestBody;

    const restaurant = await RestaurantModel.findByPk(
      request.params.id as string
    );
    if (!restaurant) return next(createError(404, "Restaurant not Found!!"));

    // @ts-ignore
    const photos = request.files["photos"] || null;

    // @ts-ignore
    const featuredImages = request.files["featuredImage"] || null;

    const photoURLs = [] as {
      photoURL: string;
      photoId: string;
      isFeatured: boolean;
    }[];
    const photoURLPromises = [] as Promise<any>[];

    const uploadPhotos = async () => {
      await Promise.all(
        photos?.map(async (file: any) => {
          const result = await uploadPhoto(file);
          // @ts-ignore
          photoURLs.push({ ...result, isFeatured: false });
        })
      );
    };

    const uploadFeaturedImage = async () => {
      await Promise.all(
        featuredImages?.map(async (file: any) => {
          const result = await uploadPhoto(file);
          // @ts-ignore
          photoURLs.push({ ...result, isFeatured: true });
        })
      );
    };

    photos && (await uploadPhotos());

    featuredImages && (await uploadFeaturedImage());

    // Create new Restaurant document with photo URLs
    const updatedRestaurantBody = {
      ...body,
      // @ts-ignore
      userId: request.user.id as string,
    };

    await RestaurantModel.update(
      { ...updatedRestaurantBody },
      {
        where: { id: request.params.id as string },
        returning: true,
      }
    );

    photoURLs?.forEach((photoObj) => {
      photoURLPromises.push(
        AssetsModel.create({
          isFeatured: photoObj?.isFeatured as boolean,
          photoId: photoObj?.photoId as string,
          photoURL: photoObj?.photoURL as string,
          restaurantId: request.params.id as string,
        })
      );
    });

    const updatedRestaurant = await RestaurantModel.findByPk(
      request.params.id as string,
      {
        nest: true,
        include: [
          {
            model: AssetsModel,
            as: "assets",
            attributes: {
              exclude: ["updatedAt", "createdAt"],
            },
          },
        ],
      }
    );

    response.status(200).json({
      status: "success",
      message: "Restaurant updated successfully!",
      data: updatedRestaurant?.toJSON(),
    });
  } catch (error: any) {
    next(createError(500, "Restaurant not Updated"));
  }
};

// Delete current Restaurant
export const deleteRestaurant = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await RestaurantModel.destroy({
      where: {
        id: request.params.id as string,
      },
    });

    // const uploadedImagesId =

    //   findRestaurant.photos?.map((photos) => photos.photoId) || [];

    // findRestaurant.featuredImage
    //   ? uploadedImagesId.push(findRestaurant.featuredImage?.photoId)
    //   : null;

    // uploadedImagesId.length && deletePhoto(uploadedImagesId);

    response.status(200).json({
      status: "success",
      message: "Restaurant deleted successfully!",
      data: { id: request.params.id as string },
    });
  } catch (error: any) {
    next(createError(500, "Restaurant not Deleted"));
  }
};

// Delete Single Photo
export const deleteRestaurantImage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await AssetsModel.destroy({
      where: { photoId: request.query.photoId as string },
    });
    await deletePhoto(request.query.photoId as string);

    response.status(200).json({
      status: "success",
      message: "Photo deleted successfully!",
      data: "",
    });
  } catch (error) {
    next(createError(500, "Photo not Deleted!"));
  }
};

// Delete Single Photo
export const deleteFeaturedImage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await AssetsModel.destroy({
      where: { photoId: request.query.photoId as string },
    });

    await deletePhoto(request.query.photoId as string);

    response.status(200).json({
      status: "success",
      message: "Photo deleted successfully!",
      data: "",
    });
  } catch (error: any) {
    next(createError(500, "Photo not Deleted!"));
  }
};
