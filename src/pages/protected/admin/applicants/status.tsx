import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaArrowLeft } from 'react-icons/fa';

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');

const ApplicantStatus: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applicant = getMockApplicants().find((a: any) => a.id === id);

  if (!applicant)
    return <div className="text-center mt-12 text-gray-500">Applicant not found.</div>;

  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg overflow-x-auto">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaClipboardList className="text-blue-600" /> Applicant Status
        </h2>
        <div className="mb-4 text-gray-700">
          <span className="font-semibold">Name:</span> {applicant.name}
        </div>
        <div className="mb-4 text-gray-700">
          <span className="font-semibold">Status:</span> {applicant.status.replace('_',' ').toUpperCase()}
        </div>
        <div className="italic text-gray-400 mb-6">Status feature coming soon...</div>
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

export default ApplicantStatus;
