import { AssetsModel } from "./Assets";
import { BookingModel } from "./Booking";
import { ClientModel } from "./Client";
import { LocationModel } from "./Location";
import { RestaurantModel } from "./Restaurant";
import { TableModel } from "./Table";
import { UserModel } from "./User";

// User To Location Relationship
UserModel.hasOne(LocationModel, { foreignKey: "userId", as: "location" });
// User To Restaurant Relationship
UserModel.hasMany(RestaurantModel, { foreignKey: "userId", as: "restaurant" });
// Location To User Relationship
LocationModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

// Restaurant To User Relationship
RestaurantModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "restaurant",
});

// Location To Restaurant Relationship
LocationModel.hasMany(RestaurantModel, {
  foreignKey: "locationId",
  as: "restaurant",
});

// Restaurant To Location Relationship
RestaurantModel.belongsTo(LocationModel, {
  foreignKey: "locationId",
  as: "location",
});

// Restaurant To Tables Relationship
RestaurantModel.hasMany(TableModel, {
  foreignKey: "restaurantId",
  as: "tables",
});

// Table To Resataurant Relationship
TableModel.belongsTo(RestaurantModel, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

// Restaurant To Bookings Relationship
RestaurantModel.hasMany(BookingModel, {
  foreignKey: "restaurantId",
  as: "bookings",
});

// Restaurant To Assets Relationship
RestaurantModel.hasMany(AssetsModel, {
  foreignKey: "restaurantId",
  as: "photos",
});

// Assets To Restaurant Relationship
AssetsModel.belongsTo(RestaurantModel, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

// Booking To Resataurant Relationship
BookingModel.belongsTo(RestaurantModel, {
  foreignKey: "restaurantId",
  as: "bookings",
});

// Table To Booking Relationship
TableModel.hasMany(BookingModel, {
  foreignKey: "tableId",
  as: "bookings",
});

// Booking To Table Relationship
BookingModel.belongsTo(TableModel, {
  foreignKey: "tableId",
  as: "table",
});

// Client To Booking Relationship
ClientModel.hasMany(BookingModel, { foreignKey: "clientId", as: "bookings" });

// Booking To Client Relationship
BookingModel.belongsTo(ClientModel, {
  foreignKey: "clientId",
  as: "bookings",
});

export {
  BookingModel,
  ClientModel,
  LocationModel,
  UserModel,
  RestaurantModel,
  TableModel,
  AssetsModel,
};
