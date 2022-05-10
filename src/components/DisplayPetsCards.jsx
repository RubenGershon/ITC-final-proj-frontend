import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisplayPetsCards({ pets }) {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row>
        {pets.map((pet) => (
          <Col md={3} key={pet._id}>
            <Card
              border="primary"
              style={{ width: "85%", boxShadow: "10px 10px 5px lightblue" }}
              className=" my-3"
            >
              <Card.Img className="cardImg" variant="top" src={pet.imageUrl} />
              <Card.Body>
                <Card.Title>
                  <b>{pet.name}</b>
                </Card.Title>
                <Card.Text>
                  <b>Adoption status:</b> {pet.adoptionStatus}
                </Card.Text>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate("/pet/" + pet._id)}
                  >
                    See More
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DisplayPetsCards;
