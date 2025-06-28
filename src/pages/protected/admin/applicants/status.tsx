import React from 'react';
import { useParams } from 'react-router-dom';

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');

const ApplicantStatus: React.FC = () => {
  const { id } = useParams();
  const applicant = getMockApplicants().find((a: any) => a.id === id);

  if (!applicant) return <div>Applicant not found.</div>;

  // Placeholder: Status logic to be implemented later
  return (
    <div style={{maxWidth:600,margin:'0 auto',padding:24}}>
      <h2>Applicant Status</h2>
      <div><b>Name:</b> {applicant.name}</div>
      <div><b>Status:</b> {applicant.status}</div>
      <div style={{marginTop:16}}>
        <i>Status feature coming soon...</i>
      </div>
    </div>
  );
};

export default ApplicantStatus;
