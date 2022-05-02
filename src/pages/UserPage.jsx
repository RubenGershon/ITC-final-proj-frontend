import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import server from "../services/server";
import { useLocation, useNavigate } from "react-router-dom";
import PetsPage from "./PetsPage";

function UserPage() {
  const [user, setUser] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const userResponse = await server.getUserById(
        window.location.href.split("/admin/user/")[1]
      );
      setUser(userResponse);
    }
    loadData();
  }, []);

  function displayUserCard() {
    return (
      <div id="userPage">
        <Button
          className="m-1"
          variant="primary"
          onClick={() => navigate(location.state.prevPath)}
        >
          {location.state.prevBtnText}
        </Button>
        <Card border="primary" style={{ width: "25rem", margin: "auto" }}>
          <Card.Body>
            <Card.Title>{user.firstName + " " + user.lastName}</Card.Title>
            <Card.Text>
              Phone: {user.phoneNumber} <br />
              Email: {user.email} <br />
              Role: {user.role} <br />
              Bio: {user.bio} <br />
            </Card.Text>
          </Card.Body>
        </Card>
        <PetsPage
          propUser={user}
          setActionBtns={false}
          prevPath={window.location.pathname}
          prevBtnText={"<== Back to user page"}
        />
      </div>
    );
  }

  return <>{user && displayUserCard()}</>;
}

export default UserPage;
