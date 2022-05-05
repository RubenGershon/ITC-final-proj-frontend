import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import server from "../services/server";

function AdvancedSearch({ setSearchResults, setServerErr }) {
  const [petType, setPetType] = useState("dog");
  const [name, setName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");

  async function handleSearch() {
    const response = await server.getPetsByQuery(createQuery());
    if (response.status === "ok") setSearchResults(response.data);
    else setServerErr(response.message);
  }

  function createQuery() {
    const query = { type: petType };
    const heightQuery = {};
    const weightQuery = {};

    if (name) query.name = name;
    if (color) query.color = color;
    if (breed) query.breed = breed;
    if (adoptionStatus) query.adoptionStatus = adoptionStatus;

    if (minHeight) heightQuery.$gte = parseInt(minHeight);
    if (maxHeight) heightQuery.$lte = parseInt(maxHeight);

    if (minWeight) weightQuery.$gte = parseInt(minWeight);
    if (maxWeight) weightQuery.$lte = parseInt(maxWeight);

    if (Object.keys(heightQuery).length !== 0) query.height = heightQuery;
    if (Object.keys(weightQuery).length !== 0) query.weight = weightQuery;

    return query;
  }
  return (
    <Form style={{ width: "50%", margin: "auto" }}>
      <br />

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Pet Type</Form.Label>
          <Form.Select onChange={(e) => setPetType(e.target.value)}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Adoption Status</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            onChange={(e) => setAdoptionStatus(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="available">Available</option>
            <option value="fostered">Fostered</option>
            <option value="adopted">Adopted</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Min Height (in CM)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Enter a value"
            value={minHeight}
            onChange={(e) => setMinHeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Max Height (in CM)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Enter a value"
            value={maxHeight}
            onChange={(e) => setMaxHeight(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Min Weigth (in Kg)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Enter a value"
            value={minWeight}
            onChange={(e) => setMinWeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Max Weigth (in Kg)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Enter a value"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Button variant="primary" type="button" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
}

export default AdvancedSearch;
