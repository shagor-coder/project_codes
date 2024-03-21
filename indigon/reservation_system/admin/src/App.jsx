import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./components/Router";
import { Register } from "./pages/Register";
import { Users } from "./pages/Users";
import { Locations } from "./pages/Locations";

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
    </Routes>
  );
};
