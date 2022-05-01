import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  return (
    <div id="adminPage">
      <div id="actionBtns">
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => navigate("/admin/addPet")}
        >
          Add a New Pet
        </Button>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => navigate("/admin/addPet")}
        >
          See all users
        </Button>
      </div>
      <div id="displayResults"></div>
    </div>
  );
}

export default AdminPage;
