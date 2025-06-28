import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
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

const UserCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const users = getMockUsers();
    const newUser = { id: Date.now().toString(), name, email, role };
    users.push(newUser);
    setMockUsers(users);
    setMessage('User created!');
    setTimeout(() => navigate('/admin/users'), 1000);
  };

  return (
    <div style={{maxWidth:400,margin:'2rem auto',background:'#fff',padding:32,borderRadius:12,boxShadow:'0 2px 16px #e5e7eb'}}>
      <h2 style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}><FaUserPlus /> Create User</h2>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
        <label style={{display:'flex',alignItems:'center',gap:8}}>
          <span>Name</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{flex:1,padding:8,borderRadius:6,border:'1px solid #d1d5db'}} />
        </label>
        <label style={{display:'flex',alignItems:'center',gap:8}}>
          <MdEmail />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required type="email" style={{flex:1,padding:8,borderRadius:6,border:'1px solid #d1d5db'}} />
        </label>
        <label style={{display:'flex',alignItems:'center',gap:8}}>
          <RiShieldUserLine />
          <select value={role} onChange={e => setRole(e.target.value)} required style={{flex:1,padding:8,borderRadius:6,border:'1px solid #d1d5db'}}>
            <option value="" disabled>Select Role</option>
            {ROLES.map(r => (
              <option key={r} value={r}>{r.replace('_',' ').toUpperCase()}</option>
            ))}
          </select>
        </label>
        <button type="submit" style={{background:'#2563eb',color:'#fff',padding:'10px 0',border:'none',borderRadius:6,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          <IoMdCheckmarkCircleOutline /> Create
        </button>
      </form>
      {message && <div style={{marginTop:16,color:'#16a34a',display:'flex',alignItems:'center',gap:8}}><IoMdCheckmarkCircleOutline /> {message}</div>}
    </div>
  );
};

export default UserCreate;
