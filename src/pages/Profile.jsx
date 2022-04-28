import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Profile({ onUpdateProfile }) {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const navigate = useNavigate();

  function onUpdateProfileWrapper() {
    onUpdateProfile();
    console.log("Signed Up");
    navigate("/home");
  }

  return (
    <>
      <Form style={{ width: "50%", margin: "auto", marginTop: "10%" }}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            placeholder={user.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="name"
            placeholder={user.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder={user.phoneNumber}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-type Password"
            value={pwdConf}
            onChange={(e) => setPwdConf(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder={user.bio} />
        </Form.Group>
        {signUpErr && <Alert variant="danger">{signUpErr}</Alert>}
        <Button
          variant="outline-primary"
          type="button"
          onClick={onUpdateProfileWrapper}
        >
          Save Modifications
        </Button>
      </Form>
    </>
  );
}

export default Profile;
