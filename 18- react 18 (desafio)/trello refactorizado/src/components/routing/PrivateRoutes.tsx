import React from "react";
import useAuth from "./hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const user = useAuth();

  if (!user) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoutes;
