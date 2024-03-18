import { LocationModel } from "../models/Location.js";
import { RestaurantModel } from "../models/Restaurant.js";
import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";

// Create a new Restaurant
export const createRestaurant = async (req, res, next) => {
  try {
    const isLocation = await LocationModel.findOne({
      userId: req.user.id,
      $and: [{ locationId: req.body.locationId }],
    });

    if (!isLocation) return next(createError(403, "Not Allowed!"));

    const newRestaurant = new RestaurantModel(req.body);

    const savedRestaurant = await newRestaurant.save();

    await isLocation.updateOne({
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
    const Restaurant = await RestaurantModel.findOne({
      _id: req.params.id,
    });

    if (!Restaurant) return next(createError(404, "Restaurant not found"));

    const { auth, ...other } = Restaurant._doc;

    res.status(200).json({ staus: "success", data: { ...other } });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update current Restaurant
export const updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await RestaurantModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedRestaurant)
      return next(createError(404, "Restaurant not Found!!"));

    const { auth, ...other } = updatedRestaurant._doc;

    res.status(200).json({
      status: "success",
      message: "Restaurant updated successfully!",
      data: other,
    });
  } catch (error) {
    next(createError(500, "Restaurant not Updated"));
  }
};

// Delete current Restaurant
export const deleteRestaurant = async (req, res, next) => {
  try {
    const findRestaurant = await RestaurantModel.findOne({
      _id: req.user.id,
    });

    if (!findRestaurant) return next(createError(404, "Restaurant not Found"));

    if (findRestaurant._id !== req.params.id)
      return next(createError(403, "Bad request!!"));

    await findRestaurant.deleteOne();

    await UserModel.updateOne(
      { _id: req.user.id },
      {
        $pull: findRestaurant._id,
      }
    );

    res
      .status(200)
      .json({ status: "success", message: "Restaurant deleted successfully!" });
  } catch (error) {
    next(createError(500, "Restaurant not Deleted"));
  }
};
