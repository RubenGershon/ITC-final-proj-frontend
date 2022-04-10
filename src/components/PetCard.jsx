import React from "react";
import { Button, Card } from "react-bootstrap";

//TODO: check if pet in the list - in case query via browser
function PetCard({ petData, onSeeMore }) {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={petData.imgUrl} />
      <Card.Body>
        <Card.Title>{petData.name}</Card.Title>
        <Card.Text>Adoption status: {petData.status}</Card.Text>
        <Button variant="primary" onClick={onSeeMore}>
          SEE MORE
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
