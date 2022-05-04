import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import GenericValidationModal from "./GenericValidationModal";
import server from "../services/server";
import { useNavigate } from "react-router-dom";

function PetForm({ pet }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const fileImgRef = useRef();
  const [toogleModal, setToogleModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setName(pet ? pet.name : "");
    setType(pet ? pet.type : "");
    setAdoptionStatus(pet ? pet.adoptionStatus : "");
    setBreed(pet ? pet.breed : "");
    setColor(pet ? pet.color : "");
    setHeight(pet ? pet.height : "");
    setWeight(pet ? pet.weight : "");
    setBio(pet ? pet.bio : "");
    setDietaryRestrictions(pet ? pet.dietaryRestrictions : "None");
    setHypoallergenic(pet ? pet.hypoallergenic : "false");
  }, []);

  async function handleAddPet() {
    if (
      !type ||
      !name ||
      !adoptionStatus ||
      !breed ||
      !color ||
      !weight ||
      !height ||
      !bio ||
      (!pet && !imageUrl)
    ) {
      setSignUpErr("Missing information - all fields must be filled.");
      return;
    }
    const petObj = {
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
      image: fileImgRef ? fileImgRef.current.files[0] : "",
    };
    if (!pet) await addOrEditPet(server.addPet, petObj);
    else await addOrEditPet(server.updatePet, petObj);
  }

  async function addOrEditPet(action, petObj) {
    const id = pet ? pet._id : "";
    try {
      const response = await action(petObj, id);
      if (response.status === "ok") {
        if (fileImgRef) fileImgRef.current.value = null;
        setToogleModal(true);
      } else {
        setSignUpErr(response.message);
      }
    } catch (err) {
      if (err.response) setSignUpErr(err.response.data.message);
      else setSignUpErr(err);
    }
  }

  function displayTypeOptions() {
    if (!pet) {
      return (
        <>
          <option value="">Please choose a type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </>
      );
    } else {
      let array = [];
      if (pet.type === "dog")
        array = [
          { dog: "Dog" },
          { cat: "Cat" },
          { bird: "Bird" },
          { rabbit: "Rabbit" },
        ];
      else if (pet.type === "cat")
        array = [
          { cat: "Cat" },
          { dog: "Dog" },
          { bird: "Bird" },
          { rabbit: "Rabbit" },
        ];
      else if (pet.type === "bird")
        array = [
          { cat: "Cat" },
          { dog: "Dog" },
          { bird: "Bird" },
          { rabbit: "Rabbit" },
        ];
      else if (pet.type === "rabbit")
        array = [
          { rabbit: "Rabbit" },
          { cat: "Cat" },
          { dog: "Dog" },
          { bird: "Bird" },
        ];
      return (
        <>
          {array.map((item, i) => (
            <option key={i} value={Object.keys(item)}>
              {Object.values(item)}
            </option>
          ))}
        </>
      );
    }
  }

  function displayAdoptionOptions() {
    if (!pet) {
      return (
        <>
          <option value="">Please choose a status</option>
          <option value="available">Available</option>
          <option value="fostered">Fostered</option>
          <option value="adopted">Adopted</option>
        </>
      );
    } else {
      let array = [];
      if (pet.adoptionStatus === "available")
        array = [
          { available: "Available" },
          { fostered: "Fostered" },
          { adopted: "Adopted" },
        ];
      else if (pet.adoptionStatus === "fostered")
        array = [
          { fostered: "Fostered" },
          { available: "Available" },
          { adopted: "Adopted" },
        ];
      else if (pet.adoptionStatus === "adopted")
        array = [
          { adopted: "Adopted" },
          { available: "Available" },
          { fostered: "Fostered" },
        ];

      return (
        <>
          {array.map((item, i) => (
            <option key={i} value={Object.keys(item)}>
              {Object.values(item)}
            </option>
          ))}
        </>
      );
    }
  }

  function displayHypoAlOptions() {
    if (!pet) {
      return (
        <>
          <option value="">Please choose an option</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </>
      );
    } else {
      if (pet.hypoallergenic === true) {
        return (
          <>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </>
        );
      } else {
        return (
          <>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </>
        );
      }
    }
  }
  return (
    <Form style={{ width: "60%", margin: "auto", marginTop: "5%" }}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Type</Form.Label>
          <Form.Select onChange={(e) => setType(e.target.value)}>
            {displayTypeOptions()}
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
            {displayAdoptionOptions()}
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
          {displayHypoAlOptions()}
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
          body={pet ? "Pet Edited Succesfully!" : "Pet Added Succesfully!"}
          onClose={() => {
            navigate("/admin");
          }}
        />
      )}
    </Form>
  );
}

export default PetForm;
