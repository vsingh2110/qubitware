import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { DEPARTMENTS } from '../../../../constants/departments';

const getMockEmployees = () => JSON.parse(localStorage.getItem('mockEmployees') || '[]');
const setMockEmployees = (emps: any[]) => localStorage.setItem('mockEmployees', JSON.stringify(emps));

const EmployeeCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emps = getMockEmployees();
    const newEmp = { id: Date.now().toString(), name, email, department };
    emps.push(newEmp);
    setMockEmployees(emps);
    setMessage('Employee created!');
    setTimeout(() => navigate('/admin/employees'), 1000);
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <select value={department} onChange={e => setDepartment(e.target.value)} required>
          <option value="" disabled>Select Department</option>
          {DEPARTMENTS.map((dep: { name: string }) => (
            <option key={dep.name} value={dep.name}>{dep.name}</option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default EmployeeCreate;
