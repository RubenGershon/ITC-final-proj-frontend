import React, { useState } from "react";
import { login } from "../services/server";
import AuthContext from "../contexts/AuthContext";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [auth, setAuth] = useState("");

  function onLogin(email, pwd) {
    const user = login(email, pwd)
    setActiveUser(user);
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
