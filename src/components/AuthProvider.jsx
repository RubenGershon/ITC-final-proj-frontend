import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [auth, setAuth] = useState("");

  function onLogin(email, pwd) {
    setActiveUser(true);
  }

  function onLogout() {
    setActiveUser(false);
  }

  function onSignUp(userName, email, pwd, setSignUpErr) {
    setActiveUser(true);
  }

  return (
    <AuthContext.Provider value={{ activeUser, onLogin, onLogout, onSignUp }}>
      {isAuthLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
