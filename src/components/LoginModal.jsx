import { Alert } from "bootstrap";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { displayLoginError } from "../lib/utils";
import AuthContext from "../contexts/AuthContext";

function LoginModal({ closeModal }) {
  const { onLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  async function onLoginWrapper() {
    onLogin();
    console.log("LoggedIn");
    closeModal();
  }

  return (
    <Form>
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
      {err && <Alert variant="danger">{displayLoginError(err)}</Alert>}
      <Button variant="outline-primary" type="button" onClick={onLoginWrapper}>
        Login with email & password
      </Button>
    </Form>
  );
}

export default LoginModal;
