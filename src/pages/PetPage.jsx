import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import server from "../services/server";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../CSS/PetPage.css";

function PetPage() {
  const { user, setUser } = useContext(UserContext);
  const [pet, setPet] = useState("");
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
          const responses = await Promise.all([
            await server.adoptPet(pet._id, { adoptionStatus: "adopted" }),
            await server.getUserData(),
          ]);
          setUser(responses[1]);
          navigate("/home");
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
          const responses = await Promise.all([
            await server.adoptPet(pet._id, { adoptionStatus: "fostered" }),
            await server.getUserData(),
          ]);
          setUser(responses[1]);
          navigate("/home");
        }}
      >
        Foster {pet.name}
      </Button>
    );
  }

  function displayReturnOrAdoptAndFosterBtn() {
    // Case where the pet belongs to the user
    if (user.caredPetsIds.find((id) => id === pet._id)) {
      return (
        <>
          <Button
            className="m-1"
            variant="primary"
            onClick={async () => {
              const responses = await Promise.all([
                await server.returnPet(pet._id),
                await server.getUserData(),
              ]);
              setUser(responses[1]);
              navigate("/home");
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
    if (user.savedPetsIds.find((id) => id === pet._id)) {
      return (
        <Button
          className="m-1"
          variant="primary"
          onClick={async () => {
            const responses = await Promise.all([
              await server.unsavePet(pet._id),
              await server.getUserData(),
            ]);
            setUser(responses[1]);
            navigate("/home");
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
            const responses = await Promise.all([
              await server.savePet(pet._id),
              await server.getUserData(),
            ]);
            setUser(responses[1]);
            navigate("/home");
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
            {user && pet && displayReturnOrAdoptAndFosterBtn()}
            {user && pet && saveOrUnsaveBtn()}
            {!user && (
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
