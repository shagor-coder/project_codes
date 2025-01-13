import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./404/NotFound";
import { PrivateRoutes } from "./components/PrivateRoute";
import { Login } from "./features/authentication/Login";
import { Register } from "./features/authentication/Register";
import { Bookings } from "./features/bookings/Bookings";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Locations } from "./features/location/Locations";
import { InstallConfirmation } from "./features/location/pages/InstallConfirmation";
import { SingleLocation } from "./features/location/pages/SingleLocation";
import { Menus } from "./features/menu/Menus";
import { AddRestaurant } from "./features/restaurant/pages/AddRestaurant";
import { EditRestaurant } from "./features/restaurant/pages/EditRestaurant";
import { Restaurants } from "./features/restaurant/Restaurants";
import { SingleRestaurant } from "./features/restaurant/SingleRestaurant";
import { AddTable } from "./features/table/pages/AddTable";
import { Table } from "./features/table/Table";
import { Users } from "./features/user/Users";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="locations" element={<Locations />} />
        <Route path="locations/:id" element={<SingleLocation />} />
        <Route path="menus" element={<Menus />} />
        {/* Route For Adding New Restaurant */}
        <Route
          path="restaurants/:locationId/new-restaurant"
          element={<AddRestaurant />}
        />
        <Route
          path="restaurants/:restaurantId/edit-restaurant"
          element={<EditRestaurant />}
        />
        <Route
          path="restaurants/:restaurantId"
          element={<SingleRestaurant />}
        />
        <Route path="restaurants/" element={<Restaurants />} />
        <Route path="tables/:restaurantId/add-table" element={<AddTable />} />
        <Route path="tables/:tableId/bookings" element={<Table />} />
        <Route path="/bookings" element={<Bookings />} />
      </Route>
      <Route path="/locations/confirmation" element={<InstallConfirmation />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
