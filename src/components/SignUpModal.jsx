import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { displaySignUpError } from "../lib/utils";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpModal({ closeModal }) {
  const { onSignUp } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const navigate = useNavigate();

  function onSignUpWrapper() {
    onSignUp();
    console.log("Signed Up");
    navigate("/home");
    closeModal();
  }

  return (
    <div id="i-sign-up">
      <h5 className="display-5">Create a new acount!</h5>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter full name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={pwd}
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
    </div>
  );
}

export default SignUpModal;
