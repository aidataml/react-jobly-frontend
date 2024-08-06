// Component for the homepage.
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="text-center p-5" style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Body>
          <Card.Title as="h1">Welcome to Jobly</Card.Title>
          <Card.Text>
            Your premier app for finding and applying to elite jobs!
          </Card.Text>
          <Button as={Link} to="/login" variant="outline-info" className="m-2">Login</Button>
          <Button as={Link} to="/signup" variant="outline-info" className="m-2">Signup</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;