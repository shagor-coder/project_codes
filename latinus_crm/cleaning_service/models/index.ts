import { AddressModel } from "./Address";
import { BookingModel } from "./Bookings";
import { ServicesModel } from "./Services";
import { UserModel } from "./User";

UserModel.hasOne(ServicesModel, { foreignKey: "userId", as: "service" });
UserModel.hasOne(AddressModel, { foreignKey: "userId", as: "address" });
UserModel.hasOne(BookingModel, { foreignKey: "userId", as: "booking" });

ServicesModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
AddressModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
BookingModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

export { AddressModel, BookingModel, ServicesModel, UserModel };
