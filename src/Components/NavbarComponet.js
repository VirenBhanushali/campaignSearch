import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

function NavbarComponent() {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand> React-Campaign </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
