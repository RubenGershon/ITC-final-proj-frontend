import { Container, Nav, Navbar } from "react-bootstrap";

function ModalNavBar({ toggleLogin, setToggleLogin }) {
  return (
    <Navbar bg="primary" variant="dark" style={{ width: "100%" }}>
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
