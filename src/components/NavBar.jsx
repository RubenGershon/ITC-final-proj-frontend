import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthModal from "./AuthModal";
import AuthContext from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const { activeUser, onLogout } = useContext(AuthContext);
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={NavLink}>
          Pet Adoption
        </Navbar.Brand>
        <Nav className="me-auto">
          {activeUser && (
            <>
              <Nav.Link to="/home" as={NavLink}>
                Home
              </Nav.Link>
              <Nav.Link to="/profile" as={NavLink}>
                Profile
              </Nav.Link>
            </>
          )}
          <Nav.Link to="/search" as={NavLink}>
            Search for a Pet
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {!activeUser && (
            <Nav.Link onClick={() => setShowModal(true)} to="#" as={NavLink}>
              LogIn/SignUp
            </Nav.Link>
          )}
          {activeUser && (
            <Nav.Link onClick={onLogout} to="#" as={NavLink}>
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
