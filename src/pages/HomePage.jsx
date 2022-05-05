import React, { useContext, useEffect, useState } from "react";
import DisplayResults from "../components/DisplayResults";
import { Alert, Button } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import server from "../services/server.js";
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router-dom";

function HomePage({
  propUser = "",
  setActionBtns = true,
  prevPath = window.location.pathname,
  prevBtnText = "<== Back to my pets page",
}) {
  const { user } = useContext(UserContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayMyPets, setDisplayMyPets] = useState(true);
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
    <>
      {savedPets && caredPets && (
        <div className="d-flex flex-column align-items-center">
          <Button
            variant="primary"
            onClick={() => setDisplayMyPets(!displayMyPets)}
          >
            {displayMyPets
              ? "Click to display Saved pets"
              : "Click to display my pets"}
          </Button>
          {displayMyPets
            ? myPetsDisplay(
                caredPets,
                "You currently do not own or foster any pets"
              )
            : myPetsDisplay(
                savedPets,
                "You currently do not have pets in your saved pets list"
              )}
        </div>
      )}
    </>
  );
}

export default HomePage;
