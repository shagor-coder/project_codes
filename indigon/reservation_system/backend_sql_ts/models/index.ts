import { AssetsModel } from "./Assets";
import { BookingModel } from "./Booking";
import { ClientModel } from "./Client";
import { LocationModel } from "./Location";
import { RestaurantModel } from "./Restaurant";
import { TableModel } from "./Table";
import { UserModel } from "./User";

// User To Location Relationship
UserModel.hasOne(LocationModel, { foreignKey: "userId", as: "location" });
LocationModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

// User To Restaurant Relationship
UserModel.hasMany(RestaurantModel, { foreignKey: "userId", as: "restaurants" });
RestaurantModel.belongsTo(UserModel, { foreignKey: "userId", as: "owner" });

// Location To Restaurant Relationship
LocationModel.hasMany(RestaurantModel, {
  foreignKey: "locationId",
  as: "restaurants",
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

TableModel.belongsTo(RestaurantModel, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

// Restaurant To Bookings Relationship
RestaurantModel.hasMany(BookingModel, {
  foreignKey: "restaurantId",
  as: "bookings",
});

BookingModel.belongsTo(RestaurantModel, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

// Restaurant To Assets Relationship
RestaurantModel.hasMany(AssetsModel, {
  foreignKey: "restaurantId",
  as: "assets",
});

AssetsModel.belongsTo(RestaurantModel, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

// Table To Booking Relationship
TableModel.hasMany(BookingModel, { foreignKey: "tableId", as: "bookings" });
BookingModel.belongsTo(TableModel, { foreignKey: "tableId", as: "table" });

// Client To Booking Relationship
ClientModel.hasMany(BookingModel, { foreignKey: "clientId", as: "bookings" });
BookingModel.belongsTo(ClientModel, { foreignKey: "clientId", as: "client" });

export {
  BookingModel,
  ClientModel,
  LocationModel,
  UserModel,
  RestaurantModel,
  TableModel,
  AssetsModel,
};
