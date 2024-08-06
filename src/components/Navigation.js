// Component for the navigation menu.
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Render navigation menu with JSX.
  return (
    <Navbar bg="light" expand="lg" className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-3">Jobly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
            <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  {user.email}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
