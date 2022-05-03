import React from "react";
import { Button, Card } from "react-bootstrap";
import "./PetCard.css"

//TODO: check if pet in the list - in case query via browser
function PetCard({ data, actionBtn, textBtn }) {
  return (
    <Card border="primary" style={{ width: "85%"}} className=" my-3">
      <Card.Img className="cardImg" variant="top" src={data.imageUrl} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>Adoption status: {data.adoptionStatus}</Card.Text>

        <Button variant="primary" onClick={actionBtn}>
          {textBtn}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
