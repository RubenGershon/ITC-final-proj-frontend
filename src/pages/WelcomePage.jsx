import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "../CSS/WelcomePage.css";
import server from "../services/server";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const [pets, setPets] = useState("");
  const [randomPets, setRandomPets] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPets() {
      const response = await server.getPetsByQuery({
        adoptionStatus: "available",
      });
      if (response.status === "ok") {
        const randomNumbers = new Set();
        while (true) {
          randomNumbers.add(Math.floor(Math.random() * response.data.length));
          if (randomNumbers.size === 4) {
            break;
          }
        }
        const tmpRandomPets = [];
        randomNumbers.forEach((n) => tmpRandomPets.push(response.data[n]));
        setPets(response.data);
        setRandomPets(tmpRandomPets);
      }
    }
    loadPets();
  }, []);

  function displayRandomPets() {
    const pets = randomPets.map((pet, i) => (
      <Card
        key={i}
        border="primary"
        style={{ width: "15%", boxShadow: "10px 10px 5px lightblue" }}
        className="randomPetCard"
        onClick={() => navigate(`/pet/${pet._id}`)}
      >
        <Card.Img className="cardImg" variant="top" src={pet.imageUrl} />
        <Card.Body>{pet.name}</Card.Body>
      </Card>
    ));
    return pets;
  }

  return (
    <div id="welcomePage">
      <div id="bannerArea">
        <div id="welcomeTxt">Find your New Best Friend!</div>
      </div>

      <div id="dataArea">
        <div id="dataTxt"> Pets Available for Adoption</div>
        <div id="dataShow">
          {randomPets && displayRandomPets()}
          <Card id="searchCard" border="primary" style={{ width: "15%", boxShadow: "10px 10px 5px lightblue"}}>
            <Card.Img
              className="cardImg"
              variant="top"
              src="https://res.cloudinary.com/dr6horuoy/image/upload/v1651766277/PetAdoptionImages/toe-icon_nyzsmp.png"
            />
            <Card.Title>{pets.length} more Pets available!</Card.Title>
            <Card.Body>
              <Button
                className="adminPageBtn"
                variant="success"
                type="button"
                onClick={() => {
                  navigate("/search");
                }}
              >
                SEARCH
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
