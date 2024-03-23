import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./components/PrivateRoute";
import { Login } from "./features/authentication/Login";
import { Register } from "./features/authentication/Register";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Users } from "./features/user/Users";
import { Locations } from "./features/location/Locations";
import NotFoundPage from "./404/NotFound";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" exact element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/locations" element={<Locations />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
