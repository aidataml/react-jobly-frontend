import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabase';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtain company data from database.
  useEffect(() => {
    async function retrieveCompanies() {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .ilike('name', `%${searchTerm}%`);
      if (error) {
        console.error("Error retrieving companies:", error);
      } else {
        setCompanies(data);
      }
      setLoading(false);
    }
    retrieveCompanies();
  }, [searchTerm]);

  // Return message as page loads.
  if (loading) {
    return <div>Please wait. Page is loading...</div>;
  }

  // Render user interface using JSX/HTML.
  return (
    <Container>
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search for companies."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <Row>
        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          companies.map(company => (
            <Col key={company.handle} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{company.name}</Card.Title>
                  <Card.Text>{company.description}</Card.Text>
                  <Button as={Link} to={`/companies/${company.handle}`} variant="outline-info">
                    View Jobs
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Companies;
