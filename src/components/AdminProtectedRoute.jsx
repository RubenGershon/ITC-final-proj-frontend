import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function AdminProtectedRoute({ children }) {
  const { activeUser } = useContext(AuthContext);
  if (!activeUser || activeUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminProtectedRoute;
