import { LocationModel } from "../models/Location.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";

// Create a new Location
export const createLocation = async (req, res, next) => {
  if (req.user.isAdmin) req.body.companyId = req.user.id;

  const { access_token, refresh_token, expires_in } = req.body.auth;

  const hasedAccessToken = await bcrypt.hash(access_token, 8);
  const hasedRefreshToken = await bcrypt.hash(refresh_token, 8);

  const newLocationData = {
    ...req.body,
    auth: {
      access_token: hasedAccessToken,
      refresh_token: hasedRefreshToken,
      expires_in: expires_in,
    },
  };

  const newLocation = new LocationModel(newLocationData);

  try {
    const savedLocation = await newLocation.save();
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
      companyId: req.user.id,
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
    const location = await LocationModel.findById({ _id: req.params.id });

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
    await LocationModel.findByIdAndUpdate(req.params.id, req.body);
    res
      .status(200)
      .json({ status: "success", message: "Location updated successfully!" });
  } catch (error) {
    next(createError(500, "Location not Updated"));
  }
};

// Delete current location
export const deleteLocation = async (req, res, next) => {
  try {
    await LocationModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "success", message: "Location deleted successfully!" });
  } catch (error) {
    next(createError(500, "Location not Deleted"));
  }
};
