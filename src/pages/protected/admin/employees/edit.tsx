import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEPARTMENTS } from '../../../../constants/departments';
import { FaUserEdit, FaEnvelope, FaBuilding, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

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
    <div className="max-w-full md:max-w-lg mx-auto p-2 md:p-8">
      <div className="bg-white rounded-xl shadow-lg p-2 md:p-8">
        <h2 className="flex items-center gap-2 mb-6 text-lg md:text-2xl font-semibold"><FaUserEdit /> Edit Employee</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <span>Name</span>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="flex-1 p-2 rounded-md border border-gray-300" />
          </label>
          <label className="flex items-center gap-2">
            <FaEnvelope />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required type="email" className="flex-1 p-2 rounded-md border border-gray-300" />
          </label>
          <label className="flex items-center gap-2">
            <FaBuilding />
            <select value={department} onChange={e => setDepartment(e.target.value)} required className="flex-1 p-2 rounded-md border border-gray-300">
              <option value="" disabled>Select Department</option>
              {DEPARTMENTS.map((dep: { name: string }) => (
                <option key={dep.name} value={dep.name}>{dep.name}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2">
            <FaCheckCircle /> Update
          </button>
        </form>
        <button onClick={()=>navigate(-1)} className="mt-4 bg-gray-100 text-blue-700 px-4 py-2 border-0 rounded-md flex items-center gap-2"><FaArrowLeft /> Go Back</button>
        {message && <div className="mt-4 text-green-600 flex items-center gap-2"><FaCheckCircle /> {message}</div>}
      </div>
    </div>
  );
};

export default EmployeeEdit;
