import React from 'react';
import { useParams } from 'react-router-dom';
import scholarshipData from '../assets/databases/Scholarship-FullyFunded.json';
import './ScholarshipDetailsPage.css'; // Import CSS file for styling

const ScholarshipDetailsPage = () => {
  const { id } = useParams();
  const scholarship = scholarshipData[id];

  // Function to render timeline section
  const renderTimeline = () => {
    if (scholarship && scholarship.Timeline) {
      return (
        <div className="scholarship-details mt-4">
          <h3>Timeline</h3>
          <p>Last Date to Submit Application: {scholarship.Timeline}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container scholarship-details">
      <div className="row">
        <div className="col-md-6">
          <img src={scholarship?.Image || 'fallback_image_url'} className="img-fluid scholarship-image" alt="Scholarship" />
        </div>
        <div className="col-md-6">
          <div className="scholarship-info">
            <h2 className="scholarship-title">{scholarship?.Title || 'No Title Available'}</h2>
            <div dangerouslySetInnerHTML={{ __html: scholarship?.Description || 'No Description Available' }} />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="scholarship-details">
            <h3>Eligibility Criteria</h3>
            <div dangerouslySetInnerHTML={{ __html: scholarship?.Eligibility_Criteria || 'No Eligibility Criteria Available' }} />
          </div>
          <div className="scholarship-details mt-4">
            <h3>How to Apply</h3>
            <div dangerouslySetInnerHTML={{ __html: scholarship?.How_to_Apply || 'No Application Information Available' }} />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="scholarship-details">
            <h3>Scholarship Details</h3>
            <div dangerouslySetInnerHTML={{ __html: scholarship?.Scholarship_Details || 'No Application Information Available' }} />
          </div>
          {renderTimeline()}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsPage;
