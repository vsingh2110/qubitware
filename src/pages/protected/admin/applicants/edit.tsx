import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaArrowLeft } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

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

  if (!applicant)
    return <div className="text-center mt-12 text-gray-500">Applicant not found.</div>;

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
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaUserEdit className="text-blue-600" /> Edit Applicant
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-medium text-gray-700">
            Name
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="flex flex-col gap-1 font-medium text-gray-700">
            <span className="flex items-center gap-2"><MdEmail /> Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required type="email" className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="flex flex-col gap-1 font-medium text-gray-700">
            <span className="flex items-center gap-2"><FaClipboardList /> Status</span>
            <select value={status} onChange={e => setStatus(e.target.value)} required className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200">
              {STATUS_VALUES.map(s => (
                <option key={s} value={s}>{s.replace('_',' ').toUpperCase()}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition">
            <IoMdCheckmarkCircleOutline /> Update
          </button>
        </form>
        {message && <div className="mt-4 text-green-600 flex items-center gap-2 font-medium"><IoMdCheckmarkCircleOutline /> {message}</div>}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mt-6 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-slate-500 font-medium transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
};

export default ApplicantEdit;
