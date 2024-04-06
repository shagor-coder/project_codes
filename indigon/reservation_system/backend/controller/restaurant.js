import { LocationModel } from "../models/Location.js";
import { RestaurantModel } from "../models/Restaurant.js";
import { deletePhoto, uploadPhoto } from "../utils/clodinary.js";
import { createError } from "../utils/error.js";

// Create a new Restaurant
export const createRestaurant = async (req, res, next) => {
  try {
    const isLocation = await LocationModel.findOne({
      userId: req.user.id,
      $and: [{ _id: req.params.locationId }],
    });

    if (!isLocation) {
      return next(createError(403, "Not Allowed!"));
    }

    const photos = req.files["photos"] || [];
    const featuredImages = req.files["featuredImage"] || [];
    const photoURLs = [];

    const uploadPhotos = async () => {
      await Promise.all(
        photos?.map(async (file) => {
          const result = await uploadPhoto(file);
          photoURLs.push(result);
        })
      );
    };

    await uploadPhotos();

    const featuredImage = await uploadPhoto(featuredImages[0]);

    // Create new Restaurant document with photo URLs
    const newRestaurantBody = {
      ...req.body,
      additionalInfo: { ...req.body.additionalInfo },
      userId: req.user.id,
      locationId: req.params.locationId,
      photos: photoURLs,
      featuredImage: { ...featuredImage },
    };

    const newRestaurant = new RestaurantModel(newRestaurantBody);
    const savedRestaurant = await newRestaurant.save();

    // Update Location document to include new Restaurant
    await isLocation.updateOne({
      _id: req.params.locationId,
      $push: {
        restaurant: savedRestaurant._id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Restaurant added!",
      data: savedRestaurant,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all Restaurants under admin
export const getAllRestaurant = async (req, res, next) => {
  try {
    const restaurants = await RestaurantModel.find({
      locationId: req.params.locationId,
    });

    if (!restaurants.length)
      return next(createError(404, "Restaurants not found"));
    res.status(200).json({ staus: "success", data: restaurants });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get Restaurant for current user
export const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) return next(createError(404, "Restaurant not found"));
    res.status(200).json({ staus: "success", data: restaurant });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update current Restaurant
export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) return next(createError(404, "Restaurant not Found!!"));

    const photos = req.files["photos"] || null;

    const featuredImages = req.files["featuredImage"] || null;
    const photoURLs = [];

    const uploadPhotos = async () => {
      await Promise.all(
        photos?.map(async (file) => {
          const result = await uploadPhoto(file);
          photoURLs.push(result);
        })
      );
    };

    await uploadPhotos();

    const featuredImage = await uploadPhoto(
      featuredImages ? featuredImages[0] : null
    );

    const photosArray = restaurant.photos?.map((photo) => {
      let newObj = {};
      newObj.photoId = photo.photoId;
      newObj.photoURL = photo.photoURL;
      return newObj;
    });

    photoURLs.length && photosArray.push(...photoURLs);

    // Create new Restaurant document with photo URLs
    const newRestaurantBody = {
      ...req?.body,
      additionalInfo: { ...req?.body?.additionalInfo },
      photos: photosArray,
      featuredImage: featuredImage ? featuredImage : restaurant.featuredImage,
    };

    const updatedRestaurant = await RestaurantModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: newRestaurantBody,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Restaurant updated successfully!",
      data: updatedRestaurant,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Restaurant not Updated"));
  }
};

// Delete current Restaurant
export const deleteRestaurant = async (req, res, next) => {
  try {
    const findRestaurant = await RestaurantModel.findOne({
      _id: req.params.id,
      $and: [
        {
          userId: req.user.id,
        },
      ],
    });

    if (!findRestaurant) return next(createError(404, "Restaurant not Found"));

    await findRestaurant.deleteOne();

    const uploadedImagesId =
      findRestaurant.photos?.map((photos) => photos.photoId) || [];

    findRestaurant.featuredImage
      ? uploadedImagesId.push(findRestaurant.featuredImage?.photoId)
      : null;

    uploadedImagesId.length && deletePhoto(uploadedImagesId);

    await LocationModel.updateOne(
      {
        _id: req.params.locationId,
      },
      {
        $pull: {
          restaurant: findRestaurant._id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Restaurant deleted successfully!",
      data: { id: findRestaurant._id },
    });
  } catch (error) {
    next(createError(500, "Restaurant not Deleted"));
  }
};

// Delete Single Photo
export const deleteRestaurantImage = async (req, res, next) => {
  try {
    const restaurnt = await RestaurantModel.findById(req.params.id);
    if (!restaurnt) return next(createError(500, "Restaurant not Found"));

    let updatedPhotos = restaurnt?.photos?.filter(
      (pt) => pt.id !== req.query.id
    );

    await deletePhoto(req.query.photoId);

    const updatedRestaurant = await RestaurantModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          photos: updatedPhotos,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Photo deleted successfully!",
      data: updatedRestaurant,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Photo not Deleted!"));
  }
};

// Delete Single Photo
export const deleteFeaturedImage = async (req, res, next) => {
  try {
    await deletePhoto(req.query.photoId);
    const updatedRestaurant = await RestaurantModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          featuredImage: {},
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Photo deleted successfully!",
      data: updatedRestaurant,
    });
  } catch (error) {
    next(createError(500, "Photo not Deleted!"));
  }
};
