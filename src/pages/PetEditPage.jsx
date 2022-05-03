import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import GenericValidationModal from "../components/GenericValidationModal";
import server from "../services/server";
import { useNavigate } from "react-router-dom";

function PetEditPage() {
  const [pet, setPet] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState();
  const [signUpErr, setSignUpErr] = useState("");
  const fileImgRef = useRef();
  const [toogleModal, setToogleModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const response = await server.getPetById(
        window.location.pathname.split("edit/")[1]
      );
      if (response.status === "ok") {
        setPet(response.data);
      }
    }
    loadData();
  }, []);

  async function handleEditPet() {
    console.log(pet);
    if (!name || !breed || !color || !weight || !height || !bio || !imageUrl) {
      setSignUpErr("Missing information - all fields must be filled.");
      return;
    }

    // try {
    //   const response = await server.addPet({
    //     type,
    //     name,
    //     adoptionStatus,
    //     breed,
    //     color,
    //     weight,
    //     height,
    //     hypoallergenic,
    //     dietaryRestrictions,
    //     bio,
    //     image: fileImgRef.current.files[0],
    //   });
    //   if (response.status === "ok") {
    //     fileImgRef.current.value = null;
    //     setToogleModal(true);
    //   } else {
    //     setSignUpErr(response.message);
    //   }
    // } catch (err) {
    //   if (err.response) setSignUpErr(err.response.data.message);
    //   else setSignUpErr(err);
    // }
  }
  function setImgRef() {
    //fileImgRef.current.value = pet.imageUrl;
  }

  function displayForm() {
    return (
      <Form style={{ width: "60%", margin: "auto", marginTop: "5%" }}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Type</Form.Label>
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option value={pet.type}>
                {pet.type[0].toUpperCase() +
                  pet.type.substring(1, pet.type.length)}
              </option>
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
              value={pet.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Adoption Status</Form.Label>
            <Form.Select onChange={(e) => setAdoptionStatus(e.target.value)}>
              <option value={pet.adoptionStatus}>
                {pet.adoptionStatus[0].toUpperCase() +
                  pet.adoptionStatus.substring(1, pet.adoptionStatus.length)}
              </option>
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
              value={pet.breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Color..."
              value={pet.color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Height (CM)</Form.Label>
            <Form.Control
              type="Number"
              placeholder="height in CM"
              value={pet.height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Weight (KG)</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Weight in KG"
              value={pet.weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Hypoallergenic</Form.Label>
          <Form.Select onChange={(e) => setHypoallergenic(e.target.value)}>
            <option value={pet.hypoallergenic}>
              {pet.hypoallergenic ? "Yes" : "No"}
            </option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dietary Restrictions</Form.Label>
          <Form.Control
            type="text"
            placeholder="None"
            value={pet.dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center">
          <Card border="primary" style={{ width: "50%" }}>
            <Card.Img variant="top" src={pet.imageUrl} />
            <Card.Body>
              <Card.Title>Current Picture for {pet.name}</Card.Title>
            </Card.Body>
          </Card>

          <Form.Group className="mb-3">
            <Form.Label>Want to change? Upload a new Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileImgRef}
              onChange={(e) => setImageUrl(true)}
            />
          </Form.Group>
        </div>
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
        <Button variant="outline-primary" type="button" onClick={handleEditPet}>
          Save Changes
        </Button>
        <br />
        <br />
        {signUpErr && <Alert variant="danger">{signUpErr}</Alert>}
        {toogleModal && (
          <GenericValidationModal
            title={"Well done!"}
            body={"Changes Saved Succesfully!"}
            onClose={() => navigate("/admin")}
          />
        )}
      </Form>
    );
  }

  return (
    <div>
      {pet && displayForm()}
      {fileImgRef.current && setImgRef()}
    </div>
  );
}

export default PetEditPage;
