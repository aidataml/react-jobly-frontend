// Component for jobs page.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import { Container, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Retrieve jobs data from the database.
  useEffect(() => {
    async function retrieveJobs() {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .ilike('title', `%${searchTerm}%`);
      if (error) {
        console.error("Error retrieving jobs:", error);
      } else {
        setJobs(data);
      }
      setLoading(false);
    }
    retrieveJobs();
  }, [searchTerm]);

  const handleApply = (jobId) => {
    // If user is not logged in, send to login page when selecting apply for a job.
    if (!user) {
      navigate('/login');
      return;
    }

    // Save applied jobs to local stoage.
    setAppliedJobs(prev => {
      const updated = [...prev, jobId];
      localStorage.setItem('appliedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  // Show messages during page load.
  if (loading) {
    return <div>Please wait. Page is loading...</div>;
  }

  // Render user interface using JSX/HTML.
  return (
    <Container>
      <h1>Jobs</h1>
      <Form.Control
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Row>
        {jobs.length === 0 ? (
          <p>There are no open jobs.</p>
        ) : (
          jobs.map(job => (
            <Col key={job.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>
                    {job.companyHandle} - {job.salary ? `$${job.salary}` : 'Salary unknown.'}
                  </Card.Text>
                  {user && appliedJobs.includes(job.id) ? (
                    <Button variant="success" disabled>Applied!</Button>
                  ) : (
                    <Button variant="outline-info" onClick={() => handleApply(job.id)}>
                      Apply
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Jobs;
