import React, { useContext, useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import server from "../services/server.js";

function PetsPage() {
  const { activeUser } = useContext(AuthContext);
  const [caredPets, setCaredPets] = useState("");
  const [savedPets, setSavedPets] = useState("");
  const [displayMyPets, setDisplayMyPets] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const userData = await server.getUserData();
      setCaredPets(await server.getPetsByIds(userData.caredPetsIds));
      setSavedPets(await server.getPetsByIds(userData.savedPetsIds));
    }
    loadData();
  }, [activeUser]);

  function myPetsDisplay() {
    if (caredPets.length === 0)
      return (
        <Alert variant="info">
          You currently do not own or foster any pets
        </Alert>
      );

    return caredPets.map((pet, i) => (
      <PetCard
        key={i + 1}
        petData={pet}
        onSeeMore={() => navigate("/pets/" + (i + 1).toString())}
      />
    ));
  }

  function mySavedPetsDisplay() {
    if (!savedPets) return <Alert variant="info">No saved pets</Alert>;

    return savedPets.map((pet, i) => (
      <PetCard
        key={i + 1}
        petData={pet}
        onSeeMore={() => navigate("/pets/" + (i + 1).toString())}
      />
    ));
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
