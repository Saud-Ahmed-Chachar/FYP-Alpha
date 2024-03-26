import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import scholarshipData from '../assets/databases/Scholarship-FullyFunded.json';
import './ScholarshipPage.css'; // Import custom CSS file for styling

const Scholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);

  useEffect(() => {
    setScholarships(scholarshipData);
    setFilteredScholarships(scholarshipData);
  }, []);

  const handleFilter = (filterType) => {
    if (filterType === 'fullyFunded') {
      setFilteredScholarships(scholarships.filter(scholarship => scholarship.Info === 'Fully Funded'));
    } else if (filterType === 'partiallyFunded') {
      setFilteredScholarships(scholarships.filter(scholarship => scholarship.Info === 'Partially Funded'));
    } else {
      setFilteredScholarships(scholarships);
    }
  };

  return (
    <Container fluid>
      <h1 className="text-center my-4">Scholarships For Undergraduate</h1>
      <Row className="my-4 justify-content-center">
        <Col className="text-center">
          <Button variant="primary" onClick={() => handleFilter('fullyFunded')}>Fully Funded</Button>{' '}
          <Button variant="secondary" onClick={() => handleFilter('partiallyFunded')}>Partially Funded</Button>
          <Button variant="light" onClick={() => handleFilter()}>All</Button>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        {filteredScholarships.map((scholarship, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-3 custom-card" style={{ marginBottom: '20px' }}>
              <div className="card-img-container">
                <img className="card-img" src={scholarship.Image} alt="Scholarship" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between p-3">
                <div>
                  <Card.Title>{scholarship.Title}</Card.Title>
                  <Card.Text>{scholarship.Info}</Card.Text>
                </div>
                <Link to={`/scholarship/${index}`} className="btn btn-info details-button">Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Scholarship;
