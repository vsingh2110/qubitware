import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const ApplicantCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('applied');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apps = getMockApplicants();
    const newApp = { id: Date.now().toString(), name, email, status };
    apps.push(newApp);
    setMockApplicants(apps);
    setMessage('Applicant created!');
    setTimeout(() => navigate('/admin/applicants'), 1000);
  };

  return (
    <div>
      <h2>Create Applicant</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <select value={status} onChange={e => setStatus(e.target.value)} required>
          {STATUS_VALUES.map(s => (
            <option key={s} value={s}>{s.replace('_',' ').toUpperCase()}</option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default ApplicantCreate;
