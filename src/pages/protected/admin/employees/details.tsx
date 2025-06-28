import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaUserTie, FaEnvelope, FaBuilding, FaRegEdit, FaFileAlt, FaArrowLeft } from 'react-icons/fa';

const getMockEmployees = () => JSON.parse(localStorage.getItem('mockEmployees') || '[]');

const EmployeeDetails: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setEmployee(getMockEmployees().find((e: any) => e.id === id));
  }, [id]);

  if (!employee)
    return (
      <div className="text-center mt-12 text-gray-500">Employee not found.</div>
    );

  return (
    <div className="max-w-lg w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaUserTie className="text-blue-600" /> Employee Details
        </h2>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaUserTie className="text-slate-500" />
          <span className="font-semibold">Name:</span> {employee.name}
        </div>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaEnvelope className="text-slate-500" />
          <span className="font-semibold">Email:</span> {employee.email}
        </div>
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <FaBuilding className="text-slate-500" />
          <span className="font-semibold">Department:</span> {employee.department}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-end">
          <Link
            to={`/admin/employees/${id}/edit`}
            className="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-md text-blue-600 font-medium transition"
          >
            <FaRegEdit /> Edit
          </Link>
          <Link
            to={`/admin/employees/${id}/documents`}
            className="flex items-center gap-2 bg-slate-100 hover:bg-teal-50 px-4 py-2 rounded-md text-teal-600 font-medium transition"
          >
            <FaFileAlt /> Documents
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

export default EmployeeDetails;
