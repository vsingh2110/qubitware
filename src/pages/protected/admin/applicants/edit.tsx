import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const STATUS_VALUES = [
  'applied',
  'screening',
  'interview_scheduled',
  'interview_completed',
  'assessment',
  'offer_pending',
  'offer_sent',
  'hired',
  'rejected',
  'withdrawn'
];

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');
const setMockApplicants = (apps: any[]) => localStorage.setItem('mockApplicants', JSON.stringify(apps));

const ApplicantEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applicants = getMockApplicants();
  const applicant = applicants.find((a: any) => a.id === id);

  const [name, setName] = useState(applicant?.name || '');
  const [email, setEmail] = useState(applicant?.email || '');
  const [status, setStatus] = useState(applicant?.status || 'applied');
  const [message, setMessage] = useState('');

  if (!applicant) return <div>Applicant not found.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = applicants.map((a: any) =>
      a.id === id ? { ...a, name, email, status } : a
    );
    setMockApplicants(updated);
    setMessage('Applicant updated!');
    setTimeout(() => navigate('/admin/applicants'), 1000);
  };

  return (
    <div>
      <h2>Edit Applicant</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <select value={status} onChange={e => setStatus(e.target.value)} required>
          {STATUS_VALUES.map(s => (
            <option key={s} value={s}>{s.replace('_',' ').toUpperCase()}</option>
          ))}
        </select>
        <button type="submit">Update</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default ApplicantEdit;
