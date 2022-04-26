import React, { useState } from "react";
import server from "../services/server";
import AuthContext from "../contexts/AuthContext";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(
    localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  );

  async function onLogin(email, pwd) {
    const response = await server.login(email, pwd);
    if (response.status === "ok") {
      localStorage.activeUser = JSON.stringify(response.data);
      setActiveUser(response.data);
    }
    return response;
  }

  async function onSignUp(signUpDataObj) {
    const response = await server.signup(signUpDataObj);
    if (response.status === "ok") {
      localStorage.activeUser = JSON.stringify(response.data);
      setActiveUser(response.data);
    }
    return response;
  }

  function onLogout() {
    localStorage.removeItem("activeUser");
    setActiveUser(null);
  }

  return (
    <AuthContext.Provider value={{ activeUser, onLogin, onLogout, onSignUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
