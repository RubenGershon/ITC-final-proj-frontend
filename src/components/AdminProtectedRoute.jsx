import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function AdminProtectedRoute({ children }) {
  const { activeUser } = useContext(AuthContext);

  return <>{activeUser && activeUser.role === "admin" && children}</>;
}

export default AdminProtectedRoute;
