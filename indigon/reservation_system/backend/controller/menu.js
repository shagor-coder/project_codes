import { MenuModel } from "../models/Menu.js";
import { createError } from "../utils/error.js";

// Create a new Menu
export const createMenu = async (req, res, next) => {
  try {
    const newMenuBody = { ...req.body, userId: req.user.id };
    const newMenu = new MenuModel(newMenuBody);
    const savedMenu = await newMenu.save();
    res.status(200).json({ status: "success", data: savedMenu });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all Menus under admin
export const getAllMenu = async (req, res, next) => {
  try {
    const menus = await MenuModel.find({
      userId: req.user.id,
    });
    if (!menus.length) return next(createError(404, "Menus not found"));
    res.status(200).json({ staus: "success", data: menus });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get Menu for current user
export const getMenu = async (req, res, next) => {
  try {
    const menu = await MenuModel.findById(req.params.id);
    if (!menu) return next(createError(404, "Menu not found"));
    res.status(200).json({ staus: "success", data: menu });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update current Menu
export const updateMenu = async (req, res, next) => {
  try {
    const updatedMenu = await MenuModel.findOneAndUpdate(
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

    if (!updatedMenu) return next(createError(404, "Menu not Found!!"));

    res.status(200).json({
      status: "success",
      message: "Menu updated successfully!",
      data: updatedMenu,
    });
  } catch (error) {
    next(createError(500, "Menu not Updated"));
  }
};

// Delete current Menu
export const deleteMenu = async (req, res, next) => {
  try {
    const deleteMenu = await MenuModel.findById(req.params.id);
    if (!deleteMenu) return next(createError(404, "Menu not Found"));
    await deleteMenu.deleteOne();
    res.status(200).json({
      status: "success",
      message: "Menu deleted successfully!",
      data: { id: req.params.id },
    });
  } catch (error) {
    next(createError(500, "Menu not Deleted"));
  }
};
