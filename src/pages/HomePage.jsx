import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import server from "../services/server.js";
import "../CSS/HomePage.css";
import DisplayPetsCards from "../components/DisplayPetsCards";

function HomePage() {
  const { activeUser } = useContext(AuthContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayCaredPets, setDisplayCaredPets] = useState(true);
  const [displaySavedPets, setDisplaySavedPets] = useState(false);

  useEffect(() => {
    async function loadData() {
      const responses = await Promise.all([
        await server.getPetsByIds(activeUser.caredPetsIds),
        await server.getPetsByIds(activeUser.savedPetsIds),
      ]);
      setCaredPets(responses[0].data);
      setSavedPets(responses[1].data);
    }
    loadData();
  }, []);

  return (
    <div id="homePage">
      <div id="homePageWelcomeCard">
        <img
          className="homePageWelcomeCardIcon"
          src="https://res.cloudinary.com/dr6horuoy/image/upload/v1652212276/statics/toe-icon_qybccr.png"
        />
        <div className="homePageWelcomeCardTxt">
          <div id="welcomeHomeTxt">Welcome Home</div>
          <div id="welcomeHomeTxt">
            {activeUser.firstName + " " + activeUser.lastName} !
          </div>
        </div>
      </div>

      <div id="homePageDataArea">
        <div id="homePageBtnsArea">
          <Button
            variant="primary"
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
            variant="primary"
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
