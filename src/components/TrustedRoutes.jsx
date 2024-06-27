import { Outlet, Navigate } from "react-router-dom";

const TrustedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "Trusted" ? <Outlet /> : <Navigate to="/" />;
};

export default TrustedRoutes;
