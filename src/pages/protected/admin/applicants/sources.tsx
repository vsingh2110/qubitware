import React from 'react';
import { FaClipboardList, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const APPLICANT_SOURCES = [
  'Job Boards',
  'Employee Referrals',
  'Social Media',
  'Agencies'
];

const ApplicantsSources: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg overflow-x-auto">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaClipboardList className="text-blue-600" /> Applicant Sources
        </h2>
        <ul className="divide-y divide-gray-100 mb-6">
          {APPLICANT_SOURCES.map(src => (
            <li key={src} className="py-3 flex items-center gap-2 text-gray-700 font-medium">
              <FaClipboardList className="text-teal-500" /> {src}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-slate-500 font-medium transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
};

export default ApplicantsSources;
