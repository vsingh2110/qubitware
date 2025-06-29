import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserShield, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const getMockUsers = () => JSON.parse(localStorage.getItem('mockUsers') || '[]');

// Mock permissions list
const ALL_PERMISSIONS = [
  { key: 'can_view_users', label: 'View Users' },
  { key: 'can_edit_users', label: 'Edit Users' },
  { key: 'can_delete_users', label: 'Delete Users' },
  { key: 'can_view_reports', label: 'View Reports' },
  { key: 'can_manage_roles', label: 'Manage Roles' },
];

// For demo, store permissions in localStorage by user id
const getUserPermissions = (id: string) => {
  const all = JSON.parse(localStorage.getItem('userPermissions') || '{}');
  return all[id] || [];
};
const setUserPermissions = (id: string, perms: string[]) => {
  const all = JSON.parse(localStorage.getItem('userPermissions') || '{}');
  all[id] = perms;
  localStorage.setItem('userPermissions', JSON.stringify(all));
};

const UserPermissions: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getMockUsers().find((u: any) => u.id === id);
  const [permissions, setPermissions] = useState<string[]>(id ? getUserPermissions(id) : []);
  const [message, setMessage] = useState('');

  if (!user)
    return <div className="text-center mt-12 text-gray-500">User not found.</div>;

  const handleToggle = (perm: string) => {
    let updated;
    if (permissions.includes(perm)) {
      updated = permissions.filter(p => p !== perm);
    } else {
      updated = [...permissions, perm];
    }
    setPermissions(updated);
  };

  const handleSave = () => {
    if (id) setUserPermissions(id, permissions);
    setMessage('Permissions updated!');
    setTimeout(() => setMessage(''), 1200);
  };

  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaUserShield className="text-blue-600" /> User Permissions
        </h2>
        <div className="mb-4 text-gray-700">
          <div><span className="font-semibold">Name:</span> {user.name}</div>
          <div><span className="font-semibold">Role:</span> {user.role.replace('_',' ').toUpperCase()}</div>
        </div>
        <ul className="divide-y divide-gray-100 mb-6">
          {ALL_PERMISSIONS.map(perm => (
            <li key={perm.key} className="py-3 flex items-center gap-3">
              <input
                type="checkbox"
                checked={permissions.includes(perm.key)}
                onChange={() => handleToggle(perm.key)}
                className="accent-blue-600 w-5 h-5"
                id={perm.key}
              />
              <label htmlFor={perm.key} className="flex-1 cursor-pointer select-none">{perm.label}</label>
              {permissions.includes(perm.key) ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-gray-300" />
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition mb-4"
        >
          Save Permissions
        </button>
        {message && <div className="mb-4 text-green-600 font-medium">{message}</div>}
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

export default UserPermissions;
