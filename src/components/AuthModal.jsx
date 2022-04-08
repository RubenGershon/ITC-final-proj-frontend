import React, { useState } from "react";
import ModalNavBar from "./ModalNavBar";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Modal } from "react-bootstrap";

function AuthModal({ show, onClose }) {
  const [toggleLogin, setToggleLogin] = useState(true);

  async function onLoginWrapper() {
    console.log("LoggedIn");
  }

  async function onGoogleLoginWrapper() {
    console.log("LoggedIn");
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <ModalNavBar
          toggleLogin={toggleLogin}
          setToggleLogin={setToggleLogin}
        />
      </Modal.Header>
      <Modal.Body>
        {toggleLogin ? (
          <LoginModal closeModal={onClose} />
        ) : (
          <SignUpModal closeModal={onClose} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
