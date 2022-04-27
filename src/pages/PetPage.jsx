import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import server from "../services/server";
import { useNavigate } from "react-router-dom";

function PetPage() {
  const location = useLocation();
  const [pet, setPet] = useState(location.state);
  const [user, setUser] = useState({ savedPetsIds: [] });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const response = await server.getUserData();
      setUser(response);
    }
    loadData();
  }, []);

  function returnAdoptOrFosterPet() {
    if (pet.adoptionStatus === "fostered")
      return <Button variant="primary">Adopt {pet.name}</Button>;
    if (pet.adoptionStatus === "adopted")
      return <Button variant="primary">Foster {pet.name}</Button>;
  }
  function isPetOwnedByUser() {
    return true;
  }

  function displayReturnOrAdoptAndFosterBtn() {
    if (isPetOwnedByUser()) {
      return (
        <Button className="m-1" variant="primary">
          Return {pet.name} to Adoption center...
        </Button>
      );
    } else {
      return (
        <>
          <Button className="m-1" variant="primary">
            Adopt {pet.name}
          </Button>
          <br />
          <Button className="m-1" variant="primary">
            Foster {pet.name}
          </Button>
        </>
      );
    }
  }

  function displayAdoptOrFosterBtn() {
    if (isPetOwnedByUser()) {
      if (pet.status === "adopted")
        return (
          <Button className="m-1" variant="primary">
            Foster {pet.name}
          </Button>
        );
      if (pet.status === "fostered")
        return (
          <Button className="m-1" variant="primary">
            Adopt {pet.name}
          </Button>
        );
    }
    return "";
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
        {displayAdoptOrFosterBtn()}
        {saveOrUnsaveBtn()}
      </Card.Body>
    </Card>
  );
}

export default PetPage;
