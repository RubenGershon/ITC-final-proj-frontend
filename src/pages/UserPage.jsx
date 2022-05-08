import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import server from "../services/server";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/UserPage.css";

function UserPage() {
  const [user, setUser] = useState("");
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayCaredPets, setDisplayCaredPets] = useState(true);
  const [displaySavedPets, setDisplaySavedPets] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const userResponse = await server.getUserById(
        window.location.href.split("/admin/user/")[1]
      );
      const responses = await Promise.all([
        await server.getPetsByIds(userResponse.data.caredPetsIds),
        await server.getPetsByIds(userResponse.data.savedPetsIds),
      ]);
      setUser(userResponse.data);
      setCaredPets(responses[0].data);
      setSavedPets(responses[1].data);
    }
    loadData();
  }, []);

  function displayPets(pets, message) {
    if (pets.length === 0) return <Alert variant="info">{message}</Alert>;
    else
      return (
        <Container fluid>
          <Row>
            {pets.map((pet) => (
              <Col md={3} key={pet._id}>
                <Card
                  border="primary"
                  style={{ width: "85%" }}
                  className=" my-3"
                >
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src={pet.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>Adoption status: {pet.adoptionStatus}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
  }

  function displayUserCard() {
    return (
      <div id="userPage">

        <div id="userPageUserInfo">
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
        </div>

        <div id="homePageBtnsArea">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => {
              setDisplaySavedPets(false);
              setDisplayCaredPets(true);
            }}
            active={displayCaredPets ? true : false}
          >
            Click to display {user.firstName} Cared pets
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => {
              setDisplayCaredPets(false);
              setDisplaySavedPets(true);
            }}
            active={displaySavedPets ? true : false}
          >
            Click to display {user.firstName} Saved pets
          </Button>
        </div>
        
        <div id="userPagePetsInfo">
          <div id="homePageDisplayPetsArea">
            {caredPets &&
              displayCaredPets &&
              displayPets(caredPets, "No Cared Pets")}
            {savedPets &&
              displaySavedPets &&
              displayPets(savedPets, "No Saved Pets")}
          </div>
        </div>
      </div>
    );
  }

  return <>{user && displayUserCard()}</>;
}

export default UserPage;
