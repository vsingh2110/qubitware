import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaRegEdit, FaFileAlt, FaArrowLeft } from 'react-icons/fa';

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');

const ApplicantDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applicant = getMockApplicants().find((a: any) => a.id === id);

  if (!applicant)
    return <div className="text-center mt-12 text-gray-500">Applicant not found.</div>;

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 mt-8">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full break-words">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaUser className="text-blue-600" /> Applicant Details
        </h2>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaUser className="text-slate-500" />
          <span className="font-semibold">Name:</span> {applicant.name}
        </div>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaEnvelope className="text-slate-500" />
          <span className="font-semibold">Email:</span> {applicant.email}
        </div>
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <FaFileAlt className="text-slate-500" />
          <span className="font-semibold">Status:</span> {applicant.status.replace('_',' ').toUpperCase()}
        </div>
        <div className="flex flex-wrap gap-3 mt-4 justify-end">
          <Link
            to={`/admin/applicants/${applicant.id}/edit`}
            className="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-md text-blue-600 font-medium transition"
          >
            <FaRegEdit /> Edit
          </Link>
          <Link
            to={`/admin/applicants/${applicant.id}/resume`}
            className="flex items-center gap-2 bg-slate-100 hover:bg-teal-50 px-4 py-2 rounded-md text-teal-600 font-medium transition"
          >
            <FaFileAlt /> Resume
          </Link>
          <Link
            to={`/admin/applicants/${applicant.id}/status`}
            className="flex items-center gap-2 bg-slate-100 hover:bg-yellow-50 px-4 py-2 rounded-md text-yellow-600 font-medium transition"
          >
            <FaFileAlt /> Status
          </Link>
          <Link
            to="/admin/applicants/sources"
            className="flex items-center gap-2 bg-slate-100 hover:bg-purple-50 px-4 py-2 rounded-md text-purple-600 font-medium transition"
          >
            <FaFileAlt /> Sources
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-slate-500 font-medium transition"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
