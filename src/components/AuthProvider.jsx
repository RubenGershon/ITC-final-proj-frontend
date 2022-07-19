import React, { useEffect, useState } from "react";
import server from "../services/server";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HERE");
    async function loadUser() {
      const response = await server.getUserData();
      if (response.status === "ok") setActiveUser(response.data);
    }
    loadUser();
  }, []);

  async function onLogin(email, pwd) {
    const response = await server.login(email, pwd);
    if (response.status === "ok") {
      const response = await server.getUserData();
      setActiveUser(response.data);
    }
    return response;
  }

  async function onSignUp(signUpDataObj) {
    const response = await server.signup(signUpDataObj);

    if (response.status === "ok") {
      const response = await server.getUserData();
      setActiveUser(response.data);
    }
    return response;
  }

  async function onLogout() {
    setActiveUser(null);
    await server.logout();
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ activeUser, setActiveUser, onLogin, onLogout, onSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
