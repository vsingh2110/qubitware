import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaDownload, FaArrowLeft } from 'react-icons/fa';

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');
const setMockApplicants = (apps: any[]) => localStorage.setItem('mockApplicants', JSON.stringify(apps));

const ApplicantResume: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applicant = getMockApplicants().find((a: any) => a.id === id);
  const [message, setMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  if (!applicant)
    return <div className="text-center mt-12 text-gray-500">Applicant not found.</div>;

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setMessage('Please select a file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(ev) {
      const dataUrl = ev.target?.result;
      const updated = getMockApplicants().map((a: any) =>
        a.id === id ? { ...a, resume: file.name, resumeData: dataUrl } : a
      );
      setMockApplicants(updated);
      setMessage('Resume uploaded!');
    };
    reader.readAsDataURL(file);
  };

  // Refresh applicant data after upload
  const currentApplicant = getMockApplicants().find((a: any) => a.id === id);

  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaFileAlt className="text-blue-600" /> Applicant Resume
        </h2>
        <div className="mb-4 text-gray-700">
          <span className="font-semibold">Name:</span> {currentApplicant.name}
        </div>
        <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="file"
            ref={fileInput}
            accept=".pdf,.doc,.docx"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            <FaUpload /> Upload Resume
          </button>
        </form>
        {currentApplicant.resume && (
          <div className="mt-4">
            <div className="font-medium text-gray-700 flex items-center gap-2">
              <FaFileAlt className="text-teal-600" /> Uploaded Resume: {currentApplicant.resume}
            </div>
            {currentApplicant.resumeData && (
              <div className="mt-2">
                <a
                  href={currentApplicant.resumeData}
                  download={currentApplicant.resume}
                  className="flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200 text-sm font-medium w-fit"
                >
                  <FaDownload /> Download Resume
                </a>
              </div>
            )}
          </div>
        )}
        {message && <div className="mt-4 text-green-600 font-medium">{message}</div>}
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

export default ApplicantResume;
