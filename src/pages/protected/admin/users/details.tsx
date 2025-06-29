import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUserShield, FaRegEdit, FaArrowLeft } from 'react-icons/fa';

const getMockUsers = () => JSON.parse(localStorage.getItem('mockUsers') || '[]');

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getMockUsers().find((u: any) => u.id === id);

  if (!user)
    return <div className="text-center mt-12 text-gray-500">User not found.</div>;

  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaUser className="text-blue-600" /> User Details
        </h2>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaUser className="text-slate-500" />
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaEnvelope className="text-slate-500" />
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <FaUserShield className="text-slate-500" />
          <span className="font-semibold">Role:</span> {user.role.replace('_',' ').toUpperCase()}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-end">
          <Link
            to={`/admin/users/${user.id}/edit`}
            className="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-md text-blue-600 font-medium transition"
          >
            <FaRegEdit /> Edit
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

export default UserDetails;
