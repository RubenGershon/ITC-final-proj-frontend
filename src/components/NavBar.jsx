import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthModal from "./AuthModal";
import "./NavBar.css";
import AuthContext from "../contexts/AuthContext";

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const { activeUser, onLogout } = useContext(AuthContext);
  return (
    <Navbar id="i-navbar" bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          {activeUser && (
            <>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          {!activeUser && (
            <Nav.Link onClick={() => setShowModal(true)} href="#">
              LogIn/SignUp
            </Nav.Link>
          )}
          {activeUser && (
            <Nav.Link href="#" onClick={onLogout}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
      <AuthModal show={showModal} onClose={() => setShowModal(false)} />
    </Navbar>
  );
}

export default NavBar;
