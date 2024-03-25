import { LocationModel } from "../models/Location.js";
import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import { getLocationAuthData } from "../utils/getLocationAuthData.js";

// Create a new Location
export const createLocation = async (req, res, next) => {
  try {
    const code = req.query.code;

    const data = await getLocationAuthData("authorization_code", code);

    if (!data) return next(createError("Invalid authorization code"));

    const { access_token, refresh_token, expires_in, locationId } = data;

    const hasedAccessToken = await bcrypt.hash(access_token, 8);
    const hasedRefreshToken = await bcrypt.hash(refresh_token, 8);

    const newLocationData = {
      access_token,
      refresh_token,
      expires_in: new Date(Date.now() + expires_in),
      locationId,
      userId: req.user.id,
      auth: {
        access_token: hasedAccessToken,
        refresh_token: hasedRefreshToken,
        expires_in: expires_in,
      },
    };

    const newLocation = new LocationModel(newLocationData);

    const savedLocation = await newLocation.save();

    await UserModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $push: {
          locations: savedLocation._id,
        },
      }
    );

    const { auth, ...other } = savedLocation._doc;
    res.status(200).json({ status: "success", data: { ...other } });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all locations under admin
export const getAllLocation = async (req, res, next) => {
  try {
    const locations = await LocationModel.find({
      userId: req.user.id,
    }).select("-auth");

    if (!locations.length) return next(createError(404, "Locations not found"));
    res.status(200).json({ staus: "success", data: locations });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get location for current user
export const getLocation = async (req, res, next) => {
  try {
    const location = await LocationModel.findOne({
      _id: req.params.id,
    })
      .populate("restaurant")
      .select("-auth");

    if (!location) return next(createError(404, "Location not found"));

    const { auth, ...other } = location._doc;

    res.status(200).json({ staus: "success", data: { ...other } });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update current location
export const updateLocation = async (req, res, next) => {
  try {
    const updatedLocation = await LocationModel.findOneAndUpdate(
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

    if (!updatedLocation) return next(createError(404, "Location not Found!!"));

    const { auth, ...other } = updatedLocation._doc;

    res.status(200).json({
      status: "success",
      message: "Location updated successfully!",
      data: other,
    });
  } catch (error) {
    next(createError(500, "Location not Updated"));
  }
};

// Delete current location
export const deleteLocation = async (req, res, next) => {
  try {
    const findLocation = await LocationModel.findOne({
      _id: req.user.id,
    });

    if (!findLocation) return next(createError(404, "Location not Found"));

    if (findLocation._id !== req.params.id)
      return next(createError(403, "Bad request!!"));

    await findLocation.deleteOne();

    await UserModel.updateOne(
      { _id: req.user.id },
      {
        $pull: findLocation._id,
      }
    );

    res
      .status(200)
      .json({ status: "success", message: "Location deleted successfully!" });
  } catch (error) {
    next(createError(500, "Location not Deleted"));
  }
};
