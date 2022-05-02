import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import server from "../services/server";
import "./AdminPage.css";

import DisplayResults from "../components/DisplayResults";

function AdminPage() {
  const [seeUsers, setSeeUsers] = useState(false);
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  async function handleSeeUsers() {
    const response = await server.getAllUsers();
    setUsers(response);
    setSeeUsers(true);
  }

  return (
    <div id="adminPage">
      <div id="actionBtns">
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => navigate("/admin/addPet")}
        >
          Add a New Pet
        </Button>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => handleSeeUsers()}
        >
          See all users
        </Button>
      </div>
      <div id="adminDisplayResults">
        {seeUsers && users && (
          <DisplayResults
            elementsToDisplay={users}
            ChildComponent={UserCard}
            action={(element) =>
              navigate("/admin/user/" + element._id, {
                state: {
                  prevPath: window.location.pathname,
                  btnText: "<== Back to admin page",
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
