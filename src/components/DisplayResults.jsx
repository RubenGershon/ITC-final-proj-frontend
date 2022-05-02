import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function DisplayResults({ elementsToDisplay, ChildComponent, action }) {
  return (
    <Container fluid>
      <Row>
        {elementsToDisplay.map((element) => (
          <Col md={3} key={element._id}>
            <ChildComponent
              key={element._id}
              data={element}
              actionBtn={() => action(element)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DisplayResults;
