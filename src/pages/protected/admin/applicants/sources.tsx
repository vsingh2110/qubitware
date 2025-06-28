import React from 'react';

const APPLICANT_SOURCES = [
  'Job Boards',
  'Employee Referrals',
  'Social Media',
  'Agencies'
];

const ApplicantsSources: React.FC = () => {
  return (
    <div style={{maxWidth:600,margin:'0 auto',padding:24}}>
      <h2>Applicant Sources</h2>
      <ul>
        {APPLICANT_SOURCES.map(src => (
          <li key={src}>{src}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantsSources;
