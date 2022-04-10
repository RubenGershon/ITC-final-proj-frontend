import React, { useContext, useEffect, useState } from "react";
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

  return (
    <Card border="primary" style={{ width: "18rem", margin: "auto" }}>
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
        <Button variant="primary">WHAT</Button>
      </Card.Body>
    </Card>
  );
}

export default PetPage;
