import React, { useContext, useEffect, useState } from "react";
import DisplayResults from "../components/DisplayResults";
import { Alert, Button } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import server from "../services/server.js";
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router-dom";
import "../CSS/HomePage.css";

function HomePage({
  propUser = "",
  setActionBtns = true,
  prevPath = window.location.pathname,
  prevBtnText = "<== Back to my pets page",
}) {
  const { user } = useContext(UserContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayCaredPets, setDisplayCaredPets] = useState(true);
  const [displaySavedPets, setDisplaySavedPets] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let userToUse;
    if (propUser) userToUse = propUser;
    else userToUse = user;

    async function loadData() {
      const responses = await Promise.all([
        await server.getPetsByIds(userToUse.caredPetsIds),
        await server.getPetsByIds(userToUse.savedPetsIds),
      ]);
      setCaredPets(responses[0]);
      setSavedPets(responses[1]);
    }
    loadData();
  }, []);

  function myPetsDisplay(pets, message) {
    if (pets.length === 0) return <Alert variant="info">{message}</Alert>;
    else
      return (
        <DisplayResults
          elementsToDisplay={pets}
          ChildComponent={PetCard}
          action={(element) =>
            navigate("/pet/" + element._id, {
              state: {
                setActionBtns: setActionBtns,
                prevPath: prevPath,
                prevBtnText: prevBtnText,
              },
            })
          }
        />
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
          {caredPets && displayCaredPets && myPetsDisplay(caredPets)}
          {savedPets && displaySavedPets && myPetsDisplay(savedPets)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
