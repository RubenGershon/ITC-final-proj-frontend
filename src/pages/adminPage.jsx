import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import server from "../services/server";
import PetForm from "../components/PetForm";
import GenericValidationModal from "../components/GenericValidationModal";
import "../CSS/AdminPage.css";

function AdminPage() {
  const [pets, setPets] = useState(false);
  const [addNewPet, setAddNewPet] = useState(false);
  const [users, setUsers] = useState("");
  const [petToEdit, setPetToEdit] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [petDeletedModal, setPetDeletedModal] = useState(false);
  const [userDeletedModal, setUserDeletedModal] = useState(false);
  const navigate = useNavigate();

  async function handleSeeUsers() {
    clearPage();
    const response = await server.getAllUsers();
    setUsers(response);
  }

  async function handleSeePets() {
    clearPage();
    const response = await server.getPetsByQuery({});
    if (response.status === "ok") {
      setPets(response.data);
    }
  }

  function clearPage() {
    setUsers("");
    setPets("");
    setAddNewPet(false);
    setPetToEdit("");
  }

  function displayPetForm(pet = "") {
    return <PetForm pet={pet} cleanPage={clearPage} />;
  }

  function displayUsers() {
    return (
      <Container fluid>
        <Row>
          {users.map((user) => (
            <Col md={3} key={user._id}>
              <Card
                border="primary"
                style={{ width: "18rem", boxShadow: "10px 10px 5px lightblue" }}
                className=" my-3"
              >
                <Card.Body>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{
                      marginBottom: "5%"
                    }}
                  >
                    <Card.Title>
                      <b>{user.firstName + " " + user.lastName}</b>
                    </Card.Title>
                    <Card.Text>email: {user.email}</Card.Text>
                  </div>

                  <div className="d-flex justify-content-evenly">
                    <Button
                      variant="primary"
                      onClick={() =>
                        navigate("/admin/user/" + user._id, {
                          state: {
                            prevPath: window.location.pathname,
                            prevBtnText: "<== Back to admin page",
                          },
                        })
                      }
                    >
                      See More
                    </Button>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        await deleteUserWrapper(user._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  function displayPets() {
    return (
      <Container fluid>
        <Row>
          {pets.map((pet) => (
            <Col md={3} key={pet._id}>
              <Card
                border="primary"
                style={{ width: "85%", boxShadow: "10px 10px 5px lightblue" }}
                className=" my-3"
              >
                <Card.Img
                  className="cardImg"
                  variant="top"
                  src={pet.imageUrl}
                />
                <Card.Body>
                  <Card.Title className="d-flex flex-column align-items-center">
                    <b>{pet.name}</b>
                  </Card.Title>

                  <div className="d-flex justify-content-evenly">
                    <Button
                      variant="primary"
                      onClick={() => {
                        clearPage();
                        setPetToEdit(pet);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={async () => {
                        await deletePetWrapper(pet._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  async function deletePetWrapper(id) {
    //TODO BEfore deleting, need to remove from users lists!!!!
    const response = await server.deletePet(id);
    if (response.status === "ok") {
      setPetDeletedModal(true);
    } else setAdminErr(response.message);
  }

  async function deleteUserWrapper(id) {
    const response = await server.deleteUser(id);
    if (response.status === "ok") {
      setUserDeletedModal(true);
    } else setAdminErr(response.message);
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
        {users && displayUsers()}
        {pets && displayPets()}
        {addNewPet && displayPetForm()}
        {petToEdit && displayPetForm(petToEdit)}
        {petDeletedModal && (
          <GenericValidationModal
            show={petDeletedModal}
            title={"Done!"}
            body={"Pet Deleted Succesfully."}
            onClose={() => {
              setPetDeletedModal(false);
              clearPage();
            }}
          />
        )}
        {userDeletedModal && (
          <GenericValidationModal
            show={userDeletedModal}
            title={"Done!"}
            body={"User Deleted Succesfully."}
            onClose={() => {
              setUserDeletedModal(false);
              clearPage();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
