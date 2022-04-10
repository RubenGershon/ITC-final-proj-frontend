import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { displaySignUpError } from "../lib/utils";
import { useNavigate } from "react-router-dom";

function Profile({ onUpdateProfile }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const navigate = useNavigate();

  function onUpdateProfileWrapper() {
    onUpdateProfile();
    console.log("Signed Up");
    navigate("/home");
  }

  return (
    <>
      <h5 className="display-5">Your profile Info:</h5>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Type here..." />
        </Form.Group>
        {signUpErr && (
          <Alert variant="danger">{displaySignUpError(signUpErr)}</Alert>
        )}
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
