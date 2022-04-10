import React, { useState } from "react";
import ModalNavBar from "./ModalNavBar";
import Login from "./Login";
import SignUp from "./SignUp";
import { Modal } from "react-bootstrap";

function AuthModal({ show, onClose }) {
  const [toggleLogin, setToggleLogin] = useState(true);

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
          <Login closeModal={onClose} />
        ) : (
          <SignUp closeModal={onClose} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
