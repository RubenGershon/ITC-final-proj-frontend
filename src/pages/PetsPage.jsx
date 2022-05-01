import React, { useContext, useEffect, useState } from "react";
import DisplayResults from "../components/DisplayResults";
import { Alert, Button } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import server from "../services/server.js";
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router-dom";

function PetsPage() {
  const { user } = useContext(UserContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayMyPets, setDisplayMyPets] = useState(true);
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

  function myPetsDisplay() {
    if (caredPets.length === 0)
      return (
        <Alert variant="info">
          You currently do not own or foster any pets
        </Alert>
      );
    else
      return (
        <DisplayResults
          elementsToDisplay={caredPets}
          ChildComponent={PetCard}
          action={(element) => navigate("/pet/" + element._id)}
        />
      );
  }

  function mySavedPetsDisplay() {
    if (!savedPets) return <Alert variant="info">No saved pets</Alert>;
    else
      return (
        <DisplayResults
          elementsToDisplay={savedPets}
          ChildComponent={PetCard}
          action={(element) => navigate("/pet/" + element._id)}
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
          {displayMyPets ? myPetsDisplay() : mySavedPetsDisplay()}
        </div>
      )}
    </>
  );
}

export default PetsPage;
