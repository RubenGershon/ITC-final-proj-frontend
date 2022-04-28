import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import server from "../services/server";
import { useNavigate } from "react-router-dom";

function PetPage() {
  const [pet, setPet] = useState("");
  const [user, setUser] = useState({ savedPetsIds: [], caredPetsIds: [] });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const responses = await Promise.all([
        await server.getUserData(),
        await server.getPetById(window.location.href.split("/pet/")[1]),
      ]);
      setUser(responses[0]);
      setPet(responses[1]);
    }
    loadData();
  }, []);

  function adoptBtn() {
    return (
      <Button
        className="m-1"
        variant="primary"
        onClick={async () => {
          await server.adoptPet(pet._id, { adoptionStatus: "adopted" });
          navigate("/pets");
        }}
      >
        Adopt {pet.name}
      </Button>
    );
  }

  function fosterBtn() {
    return (
      <Button
        className="m-1"
        variant="primary"
        onClick={async () => {
          await server.adoptPet(pet._id, { adoptionStatus: "fostered" });
          navigate("/pets");
        }}
      >
        Foster {pet.name}
      </Button>
    );
  }

  function displayReturnOrAdoptAndFosterBtn() {
    if (user.caredPetsIds.find((id) => id === pet._id)) {
      return (
        <>
          <Button
            className="m-1"
            variant="primary"
            onClick={async () => {
              await server.returnPet(pet._id);
              navigate("/pets");
            }}
          >
            Return {pet.name} to Adoption center...
          </Button>
          {pet.adoptionStatus === "adopted" && fosterBtn()}
          {pet.adoptionStatus === "fostred" && adoptBtn()}
        </>
      );
    } else {
      return (
        <>
          {adoptBtn()}
          <br />
          {fosterBtn()}
        </>
      );
    }
  }

  function saveOrUnsaveBtn() {
    if (user.savedPetsIds.find((id) => id === pet._id)) {
      return (
        <Button
          className="m-1"
          variant="primary"
          onClick={async () => {
            await server.unsavePet(pet._id);
            navigate("/pets");
          }}
        >
          Unsave {pet.name} from your pet's list
        </Button>
      );
    } else {
      return (
        <Button
          className="m-1"
          variant="primary"
          onClick={async () => {
            await server.savePet(pet._id);
            navigate("/pets");
          }}
        >
          Save {pet.name} to your pet's list
        </Button>
      );
    }
  }

  return (
    <Card border="primary" style={{ width: "25rem", margin: "auto" }}>
      <Card.Img variant="top" src={pet.imageUrl} />
      <Card.Body>
        <Card.Title>{pet.name}</Card.Title>
        <Card.Text>
          Type: {pet.type} <br />
          Color: {pet.color} <br />
          Weight: {pet.weight} <br />
          Height: {pet.height} <br />
          Adoption status: {pet.adoptionStatus} <br />
          Bio: {pet.bio} <br />
        </Card.Text>
        {displayReturnOrAdoptAndFosterBtn()}
        {saveOrUnsaveBtn()}
      </Card.Body>
    </Card>
  );
}

export default PetPage;
