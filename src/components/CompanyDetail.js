// Component for individual company page.
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveCompany() {
      const { data, error } = await supabase
        .from('companies')
        .select('*, jobs(*)')
        .eq('handle', handle)
        .single();
      if (error) {
        console.error("Error retrieving company:", error);
      } else {
        setCompany(data);
        setJobs(data.jobs || []);
      }
      setLoading(false);
    }
    retrieveCompany();
  }, [handle]);

  // If user is not logged in, load login page when they select apply for a job.
  const handleApply = (jobId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Use local storage to save applied jobs.
    setAppliedJobs(prev => {
      const updated = [...prev, jobId];
      localStorage.setItem('appliedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  // Show message for during page load.
  if (loading) {
    return <div>Please wait. Page is loading...</div>;
  }

  // Show message if company is not found.
  if (!company) {
    return <div>No company found.</div>;
  }

  // Render user interface using JSX/HTML.
  return (
    <Container>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h2>Jobs</h2>
      <Row>
        {jobs.length === 0 ? (
          <p>There are no open jobs for this company.</p>
        ) : (
          jobs.map(job => (
            <Col key={job.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>
                    {job.salary ? `$${job.salary}` : 'Salary not specified'}
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

export default CompanyDetail;
