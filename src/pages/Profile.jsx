import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Profile({ onUpdateProfile }) {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  const [updates, setUpdates] = useState({});
  const navigate = useNavigate();

  function onUpdateProfileWrapper() {
    onUpdateProfile();
    console.log("Signed Up");
    navigate("/home");
  }

  function handleChange(newValObj) {
    // Set the save btn to "active" only if the modifications
    // are different from the profile previous values.
    // for example, if a user was named "a", then changed name to "b" (without clicking save btn)
    // and then reverse back to "a", btn will still be disabled.

    console.log(updates);

    let fieldUpdated = "";
    let isFieldUpdated = "";
    if ("firstName" in newValObj) {
      fieldUpdated = "firstName";
      isFieldUpdated = newValObj.firstName !== user.firstName;
    }
    if ("lastName" in newValObj) {
      fieldUpdated = "lastName";
      isFieldUpdated = newValObj.lastName !== user.lastName;
    }
    if ("email" in newValObj) {
      fieldUpdated = "email";
      isFieldUpdated = newValObj.email !== user.email;
    }
    if ("phoneNumber" in newValObj) {
      fieldUpdated = "phoneNumber";
      isFieldUpdated = newValObj.phoneNumber !== user.phoneNumber;
    }

    const updatesCopy = Object.assign({}, updates);
    if (!isFieldUpdated && fieldUpdated in updates) {
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
            We'll never share your email with anyone else.
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
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-type Password"
            value={pwdConf}
            onChange={(e) => setPwdConf(e.target.value)}
          />
        </Form.Group>
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
        {signUpErr && <Alert variant="danger">{signUpErr}</Alert>}
        <Button
          active={activeBtn}
          disabled={!activeBtn}
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
