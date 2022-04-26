import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp({ closeModal }) {
  const { onSignUp } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [passwordConf, setPwdConf] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const navigate = useNavigate();

  async function onSignUpWrapper() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !passwordConf
    ) {
      setSignUpErr("Missing information - all fields must be filled.");
      return;
    }
    if (password !== passwordConf) {
      setSignUpErr("Passwords don't match");
      return;
    }
    try {
      const response = await onSignUp({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      if (response.status === "ok") {
        closeModal();
        navigate("/home");
      } else {
        setSignUpErr(response.message);
      }
    } catch (err) {
      if (err.response) setSignUpErr(err.response.data.message);
      else setSignUpErr(err);
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ border: firstName ? "solid green" : "" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
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
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-type your Password"
          value={passwordConf}
          onChange={(e) => setPwdConf(e.target.value)}
        />
      </Form.Group>
      <Button variant="outline-primary" type="button" onClick={onSignUpWrapper}>
        Create Account
      </Button>
      <br />
      <br />
      {signUpErr && <Alert variant="danger">{signUpErr}</Alert>}
    </Form>
  );
}

export default SignUp;
