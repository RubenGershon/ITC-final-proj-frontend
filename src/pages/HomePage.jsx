import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import server from "../services/server.js";
import { useNavigate } from "react-router-dom";
import "../CSS/HomePage.css";
import DisplayPetsCards from "../components/DisplayPetsCards";

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
          {caredPets && displayCaredPets && (
            <DisplayPetsCards pets={caredPets} />
          )}
          {savedPets && displaySavedPets && (
            <DisplayPetsCards pets={savedPets} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
