import React from "react";
import PetCard from "./PetCard";
import { useNavigate } from "react-router-dom";

function DisplayPets({ petsToDisplay }) {
  const navigate = useNavigate();

  function petsDisplay() {
    return petsToDisplay.map((pet, i) => (
      <PetCard
        key={pet._id}
        petData={pet}
        onSeeMore={() => navigate("/pet/" + pet._id)}
      />
    ));
  }

  return <>{petsDisplay()}</>;
}

export default DisplayPets;
