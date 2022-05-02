import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import server from "../services/server";
import "./AdminPage.css";
import AddNewPet from "../components/AddNewPet";

import DisplayResults from "../components/DisplayResults";

function AdminPage() {
  const [seeUsers, setSeeUsers] = useState(false);
  const [addNewPet, setAddNewPet] = useState(false);
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  async function handleSeeUsers() {
    setAddNewPet(false);
    const response = await server.getAllUsers();
    setUsers(response);
    setSeeUsers(true);
  }

  return (
    <div id="adminPage">
      <div id="actionBtns" className="d-flex flex-row justify-content-center align-items-center">
        <Button
          className="adminPageBtn"
          variant="success"
          size="lg"
          type="button"
          onClick={() => {
            setSeeUsers(false);
            setAddNewPet(false);
          }}
        >
          Clear
        </Button>

        <Button
          className="adminPageBtn"
          variant="primary"
          size="lg"
          type="button"
          onClick={() => {
            setSeeUsers(false);
            setAddNewPet(true);
          }}
        >
          Add a New Pet
        </Button>

        <Button
          className="adminPageBtn"
          variant="primary"
          size="lg"
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
                  prevBtnText: "<== Back to admin page",
                },
              })
            }
          />
        )}
        {addNewPet && <AddNewPet />}
      </div>
    </div>
  );
}

export default AdminPage;
