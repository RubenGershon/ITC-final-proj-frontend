import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import server from "../services/server";

function BasicSearch({ setSearchResults, setServerErr }) {
  const [petType, setPetType] = useState("");

  async function handleSearch() {
    const query = petType ? { type: petType } : "";
    const response = await server.getPetsByQuery(query);
    if (response.status === "ok") setSearchResults(response.data);
    else setServerErr(response.message);
  }

  return (
    <Form style={{ width: "40%", margin: "auto" }}>
      <br />
      <Form.Group>
        <Form.Label>Pet Type</Form.Label>
        <Form.Select onChange={(e) => setPetType(e.target.value)}>
          <option value="">All</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          type="button"
          style={{ marginTop: "5%" }}
          onClick={handleSearch}
        >
          Search
        </Button>

        <Button
          variant="success"
          type="button"
          style={{ marginTop: "5%" }}
          onClick={() => setSearchResults("")}
        >
          Clear
        </Button>
      </div>
    </Form>
  );
}

export default BasicSearch;
