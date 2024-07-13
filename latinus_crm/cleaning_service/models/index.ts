import { AddressModel } from "./Address";
import { BookingModel } from "./Bookings";
import { ServicesModel } from "./Services";
import { UserModel } from "./User";

UserModel.hasOne(AddressModel, { foreignKey: "userId", as: "address" });
UserModel.hasMany(ServicesModel, { foreignKey: "userId", as: "services" });
UserModel.hasMany(BookingModel, { foreignKey: "userId", as: "bookings" });

ServicesModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
AddressModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
BookingModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

export { AddressModel, BookingModel, ServicesModel, UserModel };
