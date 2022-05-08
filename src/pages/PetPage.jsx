import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import server from "../services/server";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "../CSS/PetPage.css";

function PetPage() {
  const { activeUser, setActiveUser } = useContext(AuthContext);
  const [pet, setPet] = useState("");
  const [petPageErr, setPetpageErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const response = await server.getPetById(
        window.location.href.split("/pet/")[1]
      );
      if (response.status === "ok") setPet(response.data);
    }
    loadData();
  }, []);

  function adoptBtn() {
    return (
      <Button
        className="m-1"
        variant="primary"
        onClick={async () => {
          const adoptResponse = await server.adoptPet(pet._id, {
            adoptionStatus: "adopted",
          });
          if (adoptResponse.status === "ok") {
            const userResponse = await server.getUserData();
            setActiveUser(userResponse.data);
          } else setPetpageErr(adoptResponse.message);
        }}
      >
        Adopt {pet.name}
      </Button>
    );
  }

  function fosterBtn() {
    return (
      <Button
        className="m-1"
        variant="primary"
        onClick={async () => {
          const fosterResponse = await server.adoptPet(pet._id, {
            adoptionStatus: "fostered",
          });
          if (fosterResponse.status === "ok") {
            const userResponse = await server.getUserData();
            setActiveUser(userResponse.data);
          } else setPetpageErr(fosterResponse.message);
        }}
      >
        Foster {pet.name}
      </Button>
    );
  }

  function displayReturnOrAdoptAndFosterBtn() {
    // Case where the pet belongs to the user
    if (activeUser.caredPetsIds.find((id) => id === pet._id)) {
      return (
        <>
          <Button
            className="m-1"
            variant="primary"
            onClick={async () => {
              const returnResponse = await server.returnPet(pet._id);
              if (returnResponse.status === "ok") {
                const userResponse = await server.getUserData();
                setActiveUser(userResponse.data);
              } else setPetpageErr(returnResponse.message);
            }}
          >
            Return {pet.name} to Adoption center...
          </Button>
          {pet.adoptionStatus === "adopted" && fosterBtn()}
          {pet.adoptionStatus === "fostered" && adoptBtn()}
        </>
      );
    } else {
      if (pet.adoptionStatus === "adopted") return "";
      if (pet.adoptionStatus === "fostered") return <>{adoptBtn()}</>;
      if (pet.adoptionStatus === "available")
        return (
          <>
            {adoptBtn()}
            <br />
            {fosterBtn()}
          </>
        );
    }
  }

  function saveOrUnsaveBtn() {
    if (activeUser.savedPetsIds.find((id) => id === pet._id)) {
      return (
        <Button
          className="m-1"
          variant="primary"
          onClick={async () => {
            const unsaveResponse = await server.unsavePet(pet._id);
            if (unsaveResponse.status === "ok") {
              const userResponse = await server.getUserData();
              setActiveUser(userResponse.data);
            } else setPetpageErr(unsaveResponse.message);
          }}
        >
          Unsave {pet.name} from your pet's list
        </Button>
      );
    } else {
      return (
        <Button
          className="m-1"
          variant="primary"
          onClick={async () => {
            const saveResponse = await server.savePet(pet._id);
            if (saveResponse.status === "ok") {
              const userResponse = await server.getUserData();
              setActiveUser(userResponse.data);
            } else setPetpageErr(saveResponse.message);
          }}
        >
          Save {pet.name} to your pet's list
        </Button>
      );
    }
  }

  function displayCard() {
    return (
      <div id="petPage">
        <Card id="petPageCentralCard" border="primary">
          <Card.Img src={pet.imageUrl} />
          <Card.Body>
            <Card.Title>
              <b>{pet.name}</b>
            </Card.Title>
            <Card.Text>
              <b>Type: </b> {pet.type} <br />
              <b>Color :</b> {pet.color} <br />
              <b>Weight :</b> {pet.weight} <br />
              <b>Height: </b> {pet.height} <br />
              <b>Adoption status:</b> {pet.adoptionStatus} <br />
              <b>Bio: </b> {pet.bio} <br />
            </Card.Text>
            {activeUser && pet && displayReturnOrAdoptAndFosterBtn()}
            {activeUser && pet && saveOrUnsaveBtn()}
            {!activeUser && (
              <Alert>
                In order to Adopt or Foster {pet.name} you need to Login!
              </Alert>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }

  return <>{pet && displayCard()}</>;
}

export default PetPage;
