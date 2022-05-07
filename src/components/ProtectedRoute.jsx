import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { activeUser } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  if (!activeUser || !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
