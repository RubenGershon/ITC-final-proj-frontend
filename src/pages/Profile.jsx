import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { isEmailValid } from "../services/utils.js";
import server from "../services/server";
import "../CSS/ProfilePage.css"

function Profile() {
  const { activeUser, setActiveUser, onLogout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(activeUser.firstName);
  const [lastName, setLastName] = useState(activeUser.lastName);
  const [phoneNumber, setPhoneNumber] = useState(activeUser.phoneNumber);
  const [email, setEmail] = useState(activeUser.email);
  const [bio, setBio] = useState(activeUser.bio);
  const [password, setPwd] = useState("");
  const [passwordConf, setPwdConf] = useState("");
  const [pwdConfErr, setPwdConfErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  const [updates, setUpdates] = useState({});
  const [serverErr, setServerErr] = useState("");
  const navigate = useNavigate();

  async function handleUpdate() {
    if (!isEmailValid(email)) {
      setServerErr("You have entered an invalid email address!");
      return;
    }

    const response = await server.updateUser(updates);
    if (response.status === "ok") {
      const updatedUser = await server.getUserData();
      if (activeUser.email === email) {
        setActiveUser(updatedUser.data);
        navigate("/home");
      } else {
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
      isFieldUpdated = newValObj.firstName !== activeUser.firstName;
    }
    if (newValObj.lastName) {
      fieldUpdated = "lastName";
      isFieldUpdated = newValObj.lastName !== activeUser.lastName;
    }
    if (newValObj.email) {
      fieldUpdated = "email";
      isFieldUpdated = newValObj.email !== activeUser.email;
    }
    if (newValObj.phoneNumber) {
      fieldUpdated = "phoneNumber";
      isFieldUpdated = newValObj.phoneNumber !== activeUser.phoneNumber;
    }
    if (newValObj.bio) {
      fieldUpdated = "bio";
      isFieldUpdated = newValObj.bio !== activeUser.bio;
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

    console.log(updates);
  }

  return (
    <div id="profilePage">
      <Form style={{ width: "50%", margin: "auto"}}>
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
            Important: Updating your email will automatically log you out.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
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
            onChange={(e) => {
              setBio(e.target.value);
              handleChange({ bio: e.target.value });
            }}
          />
        </Form.Group>
        <Button
          active={activeBtn}
          disabled={!activeBtn}
          variant="primary"
          type="button"
          onClick={handleUpdate}
        >
          Save Modifications
        </Button>
        {serverErr && <Alert variant="danger">{serverErr}</Alert>}
      </Form>
    </div>
  );
}

export default Profile;
