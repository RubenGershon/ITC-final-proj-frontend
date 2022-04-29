import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AuthContext from "../contexts/AuthContext";
import server from "../services/server";

function Profile() {
  const { user } = useContext(UserContext);
  const { onLogout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [password, setPwd] = useState("");
  const [passwordConf, setPwdConf] = useState("");
  const [pwdConfErr, setPwdConfErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  const [updates, setUpdates] = useState({});
  const [serverErr, setServerErr] = useState("");
  const navigate = useNavigate();

  async function handleUpdate() {
    const response = await server.updateUser(updates);
    if (response.status === "ok") {
      if (user.email === email) navigate("/home");
      else {
        server.logout();
        onLogout();
      }
    } else {
      setServerErr(response.message);
    }
  }

  function handleChange(newValObj) {
    // Set the save btn to "active" only if the modifications
    // are different from the profile previous values.
    // for example, if a user was named "a", then changed name to "b" (without clicking save btn)
    // and then reverse back to "a", btn will still be disabled.

    let fieldUpdated = "";
    let isFieldUpdated = "";
    if (newValObj.firstName) {
      fieldUpdated = "firstName";
      isFieldUpdated = newValObj.firstName !== user.firstName;
    }
    if (newValObj.lastName) {
      fieldUpdated = "lastName";
      isFieldUpdated = newValObj.lastName !== user.lastName;
    }
    if (newValObj.email) {
      fieldUpdated = "email";
      isFieldUpdated = newValObj.email !== user.email;
    }
    if (newValObj.phoneNumber) {
      fieldUpdated = "phoneNumber";
      isFieldUpdated = newValObj.phoneNumber !== user.phoneNumber;
    }

    if (
      newValObj.passwordConf &&
      password &&
      password === newValObj.passwordConf
    ) {
      fieldUpdated = "passwordConf";
      isFieldUpdated = newValObj.passwordConf !== "" && password !== "";
      setPwdConfErr("");
    } else if (newValObj.passwordConf) {
      fieldUpdated = "passwordConf";
      setPwdConfErr("wrong password confirmation");
    }

    const updatesCopy = Object.assign({}, updates);
    if (!isFieldUpdated) {
      delete updatesCopy[fieldUpdated];
    } else {
      updatesCopy[fieldUpdated] = newValObj[fieldUpdated];
    }

    setUpdates(updatesCopy);

    if (Object.keys(updatesCopy).length === 0) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }

  return (
    <>
      <Form style={{ width: "50%", margin: "auto", marginTop: "10%" }}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              handleChange({ firstName: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              handleChange({ lastName: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange({ email: e.target.value });
            }}
          />
          <Form.Text className="text-muted">
            Changing your email will automatically logged you out.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="tel"
            placeholder={user.phoneNumber}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handleChange({ phoneNumber: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Update Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-type Password"
            value={passwordConf}
            onChange={(e) => {
              setPwdConf(e.target.value);
              handleChange({ passwordConf: e.target.value });
            }}
          />
        </Form.Group>
        {pwdConfErr && <Alert variant="danger">{pwdConfErr}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={user.bio}
          />
        </Form.Group>
        <Button
          active={activeBtn}
          disabled={!activeBtn}
          variant="outline-primary"
          type="button"
          onClick={handleUpdate}
        >
          Save Modifications
        </Button>
        {serverErr && <Alert variant="danger">{serverErr}</Alert>}
      </Form>
    </>
  );
}

export default Profile;
