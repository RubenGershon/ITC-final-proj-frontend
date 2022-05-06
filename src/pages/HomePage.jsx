import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import server from "../services/server.js";
import { useNavigate } from "react-router-dom";
import "../CSS/HomePage.css";

function HomePage() {
  const { user } = useContext(UserContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayCaredPets, setDisplayCaredPets] = useState(true);
  const [displaySavedPets, setDisplaySavedPets] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const responses = await Promise.all([
        await server.getPetsByIds(user.caredPetsIds),
        await server.getPetsByIds(user.savedPetsIds),
      ]);
      setCaredPets(responses[0]);
      setSavedPets(responses[1]);
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

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => navigate("/pet/" + pet._id)}
                      >
                        See More
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

  return (
    <div id="homePage">
      <div id="homePageBanner"></div>
      <div id="homePageWelcomeCard">
        <img
          className="homePageWelcomeCardIcon"
          src="https://res.cloudinary.com/dr6horuoy/image/upload/v1651766277/PetAdoptionImages/toe-icon_nyzsmp.png"
        />
        <div className="homePageWelcomeCardTxt">
          <div id="welcomeHomeTxt">Welcome Home</div>
          <div id="welcomeHomeTxt">
            {user.firstName + " " + user.lastName} !
          </div>
        </div>
      </div>
      <div id="homePageDataArea">
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
            Click to display my pets
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
            Click to display Saved pets
          </Button>
        </div>
        <div id="homePageDisplayPetsArea">
          {caredPets && displayCaredPets && displayPets(caredPets)}
          {savedPets && displaySavedPets && displayPets(savedPets)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
