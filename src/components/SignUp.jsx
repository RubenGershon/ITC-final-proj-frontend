import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { displaySignUpError } from "../lib/utils";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp({ closeModal }) {
  const { onSignUp } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const navigate = useNavigate();

  async function onSignUpWrapper() {
    const response = await onSignUp({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    if (response.status === "ok") {
      navigate("/home");
      closeModal();
    } else {
      setSignUpErr(response.message);
    }
  }

  return (
    <>
      <h5 className="display-5">Create a new acount!</h5>
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
            value={password}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-type your Password"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        {signUpErr && (
          <Alert variant="danger">{displaySignUpError(signUpErr)}</Alert>
        )}
        <Button
          variant="outline-primary"
          type="button"
          onClick={onSignUpWrapper}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
}

export default SignUp;
