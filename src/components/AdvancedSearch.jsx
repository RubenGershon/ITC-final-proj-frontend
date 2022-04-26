import { Button, Col, Form, Row } from "react-bootstrap";

function AdvancedSearch(props) {
  return (
    <Form style={{ width: "50%", margin: "auto" }}>
      <br />

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Pet Type</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Dog</option>
            <option>Cat</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group as={Col}>
          <Form.Label>Adoption Status</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Available</option>
            <option>Adopted</option>
            <option>Fostered</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Pet Name</Form.Label>
          <Form.Control type="text" placeholder="Enter a name..." />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Min Height (in CM)</Form.Label>
          <Form.Control type="number" min="0" placeholder="Enter a value" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Max Height (in CM)</Form.Label>
          <Form.Control type="number" min="0" placeholder="Enter a value" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Min Weigth (in Kg)</Form.Label>
          <Form.Control type="number" min="0" placeholder="Enter a value" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Man Weigth (in Kg)</Form.Label>
          <Form.Control type="number" min="0" placeholder="Enter a value" />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default AdvancedSearch;
