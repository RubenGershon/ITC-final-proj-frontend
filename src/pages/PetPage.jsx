import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { fetchPet } from "../services/server";

function PetPage() {
  const petId = window.location.href.split("pets/")[1];
  const [pet, setPet] = useState("");

  useEffect(() => {
    async function loadData() {
      setPet(await fetchPet(petId));
    }
    loadData();
  }, []);

  function returnAdoptOrFosterPet() {
    if (pet.status === "fostered")
      return <Button variant="primary">Adopt {pet.name}</Button>;
    if (pet.status === "adopted")
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
    if (true) {
      return (
        <Button className="m-1" variant="primary">
          Save {pet.name} to your list
        </Button>
      );
    }
  }

  return (
    <Card border="primary" style={{ width: "25rem", margin: "auto" }}>
      <Card.Img variant="top" src={pet.imgUrl} />
      <Card.Body>
        <Card.Title>{pet.name}</Card.Title>
        <Card.Text>
          Type: {pet.type} <br />
          Color: {pet.color} <br />
          Weight: {pet.weight} <br />
          Height: {pet.height} <br />
          Adoption status: {pet.status} <br />
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
