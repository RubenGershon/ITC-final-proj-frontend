import React from "react";
import { Button, Card } from "react-bootstrap";

//TODO: check if pet in the list - in case query via browser
function PetCard({ data, actionBtn }) {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={data.imageUrl} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>Adoption status: {data.adoptionStatus}</Card.Text>

        <Button variant="primary" onClick={actionBtn}>
          SEE MORE
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
