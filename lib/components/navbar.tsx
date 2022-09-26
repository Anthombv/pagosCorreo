import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../hooks/use_auth";
import { CheckPermissions } from "../utils/check_permissions";
import { FiSettings } from "react-icons/fi";

const CustomNavbar = () => {
  const { logout, auth } = useAuth();

  return (
    <Navbar className="navbar" style={{background: "rgba(173, 52, 63, 0.8)"}}>
      <Container>
        <Navbar.Brand className="font-weight-bold text-white">
          | Grupo ANCON |
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {CheckPermissions(auth, [0]) && (
              <>
                <Nav.Link className="text-white" href="/configuration">
                  <FiSettings />
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Button variant="outline-light" onClick={logout}>
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
