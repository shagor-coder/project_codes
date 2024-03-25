import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";

export const PrivateRoutes = () => {
  const { auth } = UseAuthContext();

  return auth && auth.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
