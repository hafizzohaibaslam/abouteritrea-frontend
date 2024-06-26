import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.confirmed === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
