import React, { useContext, useEffect, useState } from "react";
import server from "../services/server";
import UserContext from "../contexts/UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function loadData() {
      const response = await server.getUserData();
      setUser(response);
    }
    loadData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {console.log("PING USER-PROVIDER: ", user)}
      {user && children}
    </UserContext.Provider>
  );
}

export default UserProvider;
