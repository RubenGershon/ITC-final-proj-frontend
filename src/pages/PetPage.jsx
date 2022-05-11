import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import server from "../services/server";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import GenericValidationModal from "../components/GenericValidationModal";

import "../CSS/PetPage.css";

function PetPage() {
  const { activeUser, setActiveUser } = useContext(AuthContext);
  const [pet, setPet] = useState("");
  const [isAdopted, setIsAdopted] = useState(false);
  const [isFostered, setIsFostered] = useState(false);
  const [isReturned, setIsReturned] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false);
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
            setIsAdopted(true);
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
            setIsFostered(true);
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
                setIsReturned(true);
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
              setIsUnsaved(true);
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
              setIsSaved(true);
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
        <Card
          id="petPageCentralCard"
          border="primary"
          style={{ boxShadow: "10px 10px 5px lightblue" }}
        >
          <Card.Img id="petPagePetImg" src={pet.imageUrl} />
          <Card.Body>
            <Card.Title>
              <b>{pet.name}</b>
            </Card.Title>
            <Card.Text>
              <b>Type: </b> {pet.type} <br />
              <b>Breed :</b> {pet.breed} <br />
              <b>Color :</b> {pet.color} <br />
              <b>Weight :</b> {pet.weight} <br />
              <b>Height: </b> {pet.height} <br />
              <b>Adoption status:</b> {pet.adoptionStatus} <br />
              <b>Hypoallergenic:</b> {pet.hypoallergenic ? "True" : "False"}{" "}
              <br />
              <b>Dietary Restrictions:</b> {pet.dietaryRestrictions} <br />
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
        {isAdopted && (
          <GenericValidationModal
            show={isAdopted}
            title={"Wohooo!"}
            body={`${pet.name} Adopted Succesfully!!!`}
            onClose={() => {
              setIsAdopted(false);
              navigate("/home");
            }}
          />
        )}
        {isFostered && (
          <GenericValidationModal
            show={isFostered}
            title={"Wohooo!"}
            body={`${pet.name} Fostered Succesfully!!!`}
            onClose={() => {
              setIsFostered(false);
              navigate("/home");
            }}
          />
        )}
        {isReturned && (
          <GenericValidationModal
            show={isReturned}
            title={"Done..."}
            body={`${pet.name} has returned to the Adoption center....He will miss you!`}
            onClose={() => {
              setIsReturned(false);
              navigate("/home");
            }}
          />
        )}
        {isSaved && (
          <GenericValidationModal
            show={isSaved}
            title={"Done!"}
            body={`${pet.name} Saved for later.`}
            onClose={() => {
              setIsSaved(false);
              navigate("/home");
            }}
          />
        )}
        {isUnsaved && (
          <GenericValidationModal
            show={isUnsaved}
            title={"Done!"}
            body={`${pet.name} is unsaved from your pet's list.`}
            onClose={() => {
              setIsUnsaved(false);
              navigate("/home");
            }}
          />
        )}
      </div>
    );
  }

  return <>{pet && displayCard()}</>;
}

export default PetPage;
