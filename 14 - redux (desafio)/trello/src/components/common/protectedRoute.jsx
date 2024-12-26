/* eslint-disable react/prop-types */
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  if (!sessionStorage.getItem("user")) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default ProtectedRoute;
