import React from "react";
import { Button, Card } from "react-bootstrap";

//TODO: check if pet in the list - in case query via browser
function UserCard({ data, actionBtn }) {
  return (
    <Card border="primary" style={{ width: "18rem" }} className=" my-3">
      <Card.Body>
        <Card.Title>{data.firstName + " " + data.lastName}</Card.Title>
        <Card.Text>email: {data.email}</Card.Text>

        <Button variant="primary" onClick={actionBtn}>
          SEE MORE
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
