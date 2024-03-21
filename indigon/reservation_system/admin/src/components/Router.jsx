import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const authUser = "yes";
  return authUser ? <Outlet /> : <Navigate to="/login" replace={true} />;
};
