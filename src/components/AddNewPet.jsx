import React, { useRef, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import GenericValidationModal from "./GenericValidationModal";
import server from "../services/server";
import { useNavigate } from "react-router-dom";

function AddNewPet() {
  const [type, setType] = useState("dog");
  const [name, setName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("available");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("None");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [signUpErr, setSignUpErr] = useState("");
  const fileImgRef = useRef();
  const [toogleModal, setToogleModal] = useState(false);
  const navigate = useNavigate();

  async function handleAddPet() {
    if (!name || !breed || !color || !weight || !height || !bio || !imageUrl) {
      setSignUpErr("Missing information - all fields must be filled.");
      return;
    }

    try {
      const response = await server.addPet({
        type,
        name,
        adoptionStatus,
        breed,
        color,
        weight,
        height,
        hypoallergenic,
        dietaryRestrictions,
        bio,
        image: fileImgRef.current.files[0],
      });
      if (response.status === "ok") {
        fileImgRef.current.value = null;
        setToogleModal(true);
      } else {
        setSignUpErr(response.message);
      }
    } catch (err) {
      if (err.response) setSignUpErr(err.response.data.message);
      else setSignUpErr(err);
    }
  }

  return (
    <Form style={{ width: "60%", margin: "auto", marginTop: "5%" }}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Type</Form.Label>
          <Form.Select onChange={(e) => setType(e.target.value)}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Adoption Status</Form.Label>
          <Form.Select onChange={(e) => setAdoptionStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="fostered">Fostered</option>
            <option value="adopted">Adopted</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color..."
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Height (CM)</Form.Label>
          <Form.Control
            type="Number"
            placeholder="height in CM"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Weight (KG)</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Weight in KG"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Hypoallergenic</Form.Label>
        <Form.Select onChange={(e) => setHypoallergenic(e.target.value)}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Dietary Restrictions</Form.Label>
        <Form.Control
          type="text"
          placeholder="None"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload a Picture of your Pet</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          placeholder="..."
          ref={fileImgRef}
          onChange={(e) => setImageUrl(true)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="..."
        />
      </Form.Group>
      <Button variant="outline-primary" type="button" onClick={handleAddPet}>
        Add Pet
      </Button>
      <br />
      <br />
      {signUpErr && <Alert variant="danger">{signUpErr}</Alert>}
      {toogleModal && (
        <GenericValidationModal
          title={"Well done!"}
          body={"New Pet added succesfully!"}
          onClose={() => navigate("/admin")}
        />
      )}
    </Form>
  );
}

export default AddNewPet;
