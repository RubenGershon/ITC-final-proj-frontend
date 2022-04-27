import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import server from "../services/server";

function BasicSearch({ setSearchResults, setServerErr }) {
  const [petType, setPetType] = useState("dog");

  async function handleSearch() {
    const response = await server.getPetsByQuery({ type: petType });
    if (response.status === "ok") setSearchResults(response.data);
    else setServerErr(response.message);
  }


  return (
    <Form style={{ width: "50%", margin: "auto" }}>
      <br />
      <Form.Group>
        <Form.Label>Pet Type</Form.Label>
        <Form.Select onChange={(e) => setPetType(e.target.value)}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
}

export default BasicSearch;
