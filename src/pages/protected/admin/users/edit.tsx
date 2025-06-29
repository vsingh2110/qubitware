import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaArrowLeft } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiShieldUserLine } from 'react-icons/ri';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const ROLES = [
  'hr_manager',
  'recruiter',
  'interviewer',
  'admin'
];

const getMockUsers = () => JSON.parse(localStorage.getItem('mockUsers') || '[]');
const setMockUsers = (users: any[]) => localStorage.setItem('mockUsers', JSON.stringify(users));

const UserEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const users = getMockUsers();
  const user = users.find((u: any) => u.id === id);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [message, setMessage] = useState('');

  if (!user)
    return <div className="text-center mt-12 text-gray-500">User not found.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = users.map((u: any) =>
      u.id === id ? { ...u, name, email, role } : u
    );
    setMockUsers(updated);
    setMessage('User updated!');
    setTimeout(() => navigate('/admin/users'), 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-800">
          <FaUserEdit className="text-blue-600" /> Edit User
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
            <span className="flex items-center gap-2"><RiShieldUserLine /> Role</span>
            <select value={role} onChange={e => setRole(e.target.value)} required className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200">
              <option value="" disabled>Select Role</option>
              {ROLES.map(r => (
                <option key={r} value={r}>{r.replace('_',' ').toUpperCase()}</option>
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

export default UserEdit;
