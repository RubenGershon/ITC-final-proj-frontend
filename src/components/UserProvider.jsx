import React, { useContext, useEffect, useState } from "react";
import server from "../services/server";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const { activeUser, onLogout } = useContext(AuthContext);

  useEffect(() => {
    async function loadData() {
      const response = await server.getUserData();

      if (response.status === "ok") setUser(response.data);
      else onLogout();
    }
    loadData();
  }, [activeUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {console.log("PING USER-PROVIDER: ", user)}
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
