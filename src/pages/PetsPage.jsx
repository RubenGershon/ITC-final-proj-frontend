import React, { useContext, useEffect, useState } from "react";
import DisplayPets from "../components/DisplayPets";
import { Alert, Button } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import server from "../services/server.js";

function PetsPage() {
  const { user } = useContext(UserContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayMyPets, setDisplayMyPets] = useState(true);

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
    else return <DisplayPets petsToDisplay={caredPets} />;
  }

  function mySavedPetsDisplay() {
    if (!savedPets) return <Alert variant="info">No saved pets</Alert>;
    else return <DisplayPets petsToDisplay={savedPets} />;
  }

  return (
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
  );
}

export default PetsPage;
