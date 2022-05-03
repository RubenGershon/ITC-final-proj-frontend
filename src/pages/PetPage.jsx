import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import server from "../services/server";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function PetPage() {
  const location = useLocation();
  const [pet, setPet] = useState("");
  const { user, setUser } = useContext(UserContext);
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
          navigate("/pets");
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
          navigate("/pets");
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
              navigate("/pets");
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
            navigate("/pets");
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
            navigate("/pets");
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
        <Button
          className="m-1"
          variant="primary"
          onClick={() => navigate(location.state.prevPath)}
        >
          {location.state.prevBtnText}
        </Button>
        <Card border="primary" style={{ width: "25rem", margin: "auto" }}>
          <Card.Img variant="top" src={pet.imageUrl} />
          <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <Card.Text>
              Type: {pet.type} <br />
              Color: {pet.color} <br />
              Weight: {pet.weight} <br />
              Height: {pet.height} <br />
              Adoption status: {pet.adoptionStatus} <br />
              Bio: {pet.bio} <br />
            </Card.Text>
            {location.state.setActionBtns &&
              user &&
              pet &&
              displayReturnOrAdoptAndFosterBtn()}
            {location.state.setActionBtns && user && pet && saveOrUnsaveBtn()}
          </Card.Body>
        </Card>
      </div>
    );
  }

  return <>{pet && user && displayCard()}</>;
}

export default PetPage;
