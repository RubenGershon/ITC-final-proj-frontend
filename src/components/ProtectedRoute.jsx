import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { activeUser } = useContext(AuthContext);
  if (!activeUser) {
    return <Navigate to={"/"} replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
