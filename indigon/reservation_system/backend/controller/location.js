import { LocationModel } from "../models/Location.js";
import { createError } from "../utils/error.js";

export const createLocation = async (req, res, next) => {
  const newLocation = new LocationModel(req.body);
  try {
    const savedLocation = await newLocation.save();
    res.status(200).send(savedLocation.id);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getLocationById = async (req, res, next) => {
  try {
    const location = await LocationModel.where("Location").findOne(
      req.params.id
    );

    if (!location) return next(createError(404, "Location not found"));

    res.status(200).send(Location);
  } catch (error) {
    next(createError(500, error.message));
  }
};
