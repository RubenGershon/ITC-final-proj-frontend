import React, { useState } from "react";
import { signup, login } from "../services/server";
import AuthContext from "../contexts/AuthContext";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  function onLogin(email, pwd) {
    const user = login(email, pwd);
    setActiveUser(user);
  }

  function onLogout() {
    setActiveUser(false);
  }

  async function onSignUp(signUpDataObj) {
    const response = await signup(signUpDataObj);
    if (response.status === "ok") setActiveUser(response.user);
    return response;
  }

  return (
    <AuthContext.Provider value={{ activeUser, onLogin, onLogout, onSignUp }}>
      {isAuthLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
