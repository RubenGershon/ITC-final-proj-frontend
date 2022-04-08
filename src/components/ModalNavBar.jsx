import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";

function ModalNavBar({ toggleLogin, setToggleLogin }) {

  return (
    <Navbar id="i-navbar" bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <>
            <Nav.Link
              active={toggleLogin ? true : ""}
              href="#"
              onClick={() => setToggleLogin(true)}
            >
              Login
            </Nav.Link>
            <Nav.Link
              active={!toggleLogin ? true : ""}
              href="#"
              onClick={() => setToggleLogin(false)}
            >
              Signup
            </Nav.Link>
          </>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ModalNavBar;
