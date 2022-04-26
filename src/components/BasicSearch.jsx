import { Button, Form } from "react-bootstrap";

function BasicSearch(props) {
  return (
    <Form style={{ width: "50%", margin: "auto" }}>
      <br />
      <Form.Group>
        <Form.Label>Pet Type</Form.Label>
        <Form.Select defaultValue="Choose...">
          <option>Choose...</option>
          <option>Dog</option>
          <option>Cat</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default BasicSearch;
