import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authStore";

export const PrivateRoutes = () => {
  const authUser = useAuth((state) => state.authUser);
  return authUser ? <Outlet /> : <Navigate to="/login" replace={true} />;
};
