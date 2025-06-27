import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @ts-ignore
import { DEPARTMENTS } from '../../../../constants/departments';

const getMockEmployees = () => JSON.parse(localStorage.getItem('mockEmployees') || '[]');
const setMockEmployees = (emps: any[]) => localStorage.setItem('mockEmployees', JSON.stringify(emps));

const EmployeeEdit: React.FC = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const emp = getMockEmployees().find((e: any) => e.id === id);
    if (emp) {
      setName(emp.name);
      setEmail(emp.email);
      setDepartment(emp.department);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emps = getMockEmployees();
    const idx = emps.findIndex((e: any) => e.id === id);
    if (idx !== -1) {
      emps[idx] = { id, name, email, department };
      setMockEmployees(emps);
      setMessage('Employee updated!');
      setTimeout(() => navigate(`/admin/employees/${id}`), 1000);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <select value={department} onChange={e => setDepartment(e.target.value)} required>
          <option value="" disabled>Select Department</option>
          {DEPARTMENTS.map((dep: { name: string }) => (
            <option key={dep.name} value={dep.name}>{dep.name}</option>
          ))}
        </select>
        <button type="submit">Update</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default EmployeeEdit;
