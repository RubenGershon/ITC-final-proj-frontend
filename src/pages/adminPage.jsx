import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import PetCard from "../components/PetCard";
import server from "../services/server";
import "./AdminPage.css";
import PetForm from "../components/PetForm";

import DisplayResults from "../components/DisplayResults";

function AdminPage() {
  const [seePets, setSeePets] = useState(false);
  const [pets, setPets] = useState(false);
  const [addNewPet, setAddNewPet] = useState(false);
  const [editPet, setEditPet] = useState(false);
  const [users, setUsers] = useState("");
  const [seeUsers, setSeeUsers] = useState(false);
  const [petToEdit, setPetToEdit] = useState("");
  const navigate = useNavigate();

  async function handleSeeUsers() {
    clearPage();
    const response = await server.getAllUsers();
    setUsers(response);
    setSeeUsers(true);
  }

  async function handleSeePets() {
    clearPage();
    const response = await server.getPetsByQuery({});
    if (response.status === "ok") {
      setPets(response.data);
      setSeePets(true);
    }
  }

  function clearPage() {
    setSeeUsers(false);
    setSeePets(false);
    setAddNewPet(false);
    setEditPet(false);
  }

  function displayPetForm(pet = "") {
    return <PetForm pet={pet} cleanPage={clearPage} />;
  }

  function displayUserResultsWrapper() {
    return (
      <DisplayResults
        elementsToDisplay={users}
        ChildComponent={UserCard}
        action={(user) =>
          navigate("/admin/user/" + user._id, {
            state: {
              prevPath: window.location.pathname,
              prevBtnText: "<== Back to admin page",
            },
          })
        }
        textBtn={"See More"}
      />
    );
  }

  function displayPetResultsWrapper() {
    return (
      <DisplayResults
        elementsToDisplay={pets}
        ChildComponent={PetCard}
        action={(pet) => {
          clearPage();
          setPetToEdit(pet);
          setEditPet(true);
        }}
        textBtn={"Edit"}
        action2={(pet) => {
          deletePetWrapper(pet);
        }}
      />
    );
  }

  function deletePetWrapper() {
    console.log("Deleting...")
  }

  return (
    <div id="adminPage">
      <div
        id="actionBtns"
        className="d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          className="adminPageBtn"
          variant="success"
          size="lg"
          type="button"
          onClick={() => clearPage()}
        >
          Clear
        </Button>

        <Button
          className="adminPageBtn"
          variant="primary"
          size="lg"
          type="button"
          onClick={() => {
            clearPage();
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
          See all Users
        </Button>

        <Button
          className="adminPageBtn"
          variant="primary"
          size="lg"
          type="button"
          onClick={() => handleSeePets()}
        >
          See all Pets
        </Button>
      </div>
      <div id="adminDisplayResults">
        {seeUsers && users && displayUserResultsWrapper()}
        {seePets && pets && displayPetResultsWrapper()}
        {addNewPet && displayPetForm()}
        {editPet && displayPetForm(petToEdit)}
      </div>
    </div>
  );
}

export default AdminPage;
