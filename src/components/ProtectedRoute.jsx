import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { activeUser } = useContext(AuthContext);
  return activeUser ? <>{children}</> : <Navigate to={"/"} replace />;
}

export default ProtectedRoute;
