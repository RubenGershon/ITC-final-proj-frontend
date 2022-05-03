import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function DisplayResults({ elementsToDisplay, ChildComponent, action, textBtn = "See More" }) {
  return (
    <Container fluid>
      <Row>
        {elementsToDisplay.map((element) => (
          <Col md={3} key={element._id}>
            <ChildComponent
              key={element._id}
              data={element}
              actionBtn={() => action(element)}
              textBtn={textBtn}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DisplayResults;
