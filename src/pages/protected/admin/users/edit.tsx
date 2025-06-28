import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

  if (!user) return <div>User not found.</div>;

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
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <select value={role} onChange={e => setRole(e.target.value)} required>
          <option value="" disabled>Select Role</option>
          {ROLES.map(r => (
            <option key={r} value={r}>{r.replace('_',' ').toUpperCase()}</option>
          ))}
        </select>
        <button type="submit">Update</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default UserEdit;
