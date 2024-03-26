import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./components/PrivateRoute";
import { Login } from "./features/authentication/Login";
import { Register } from "./features/authentication/Register";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Users } from "./features/user/Users";
import { Locations } from "./features/location/Locations";
import NotFoundPage from "./404/NotFound";
import { SingleLocation } from "./features/location/pages/SingleLocation";
import { InstallConfirmation } from "./features/location/pages/InstallConfirmation";
import { Restaurant } from "./features/restaurant/Restuarant";
import { Menus } from "./features/menu/Menus";

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
        <Route path="restaurant/:locationId" element={<Restaurant />} />
      </Route>
      <Route path="/locations/confirmation" element={<InstallConfirmation />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
