import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";


function HomePage() {
  const { onLogin, activeUser } = useContext(AuthContext);
  return <div>HOME PAGE</div>;
}

export default HomePage;
