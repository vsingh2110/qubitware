import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEPARTMENTS } from '../../../../constants/departments';
import { FaUserTie, FaEnvelope, FaBuilding, FaEye, FaRegEdit, FaTrash, FaPlus, FaListUl } from 'react-icons/fa';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
}

const getMockEmployees = (): Employee[] => {
  return JSON.parse(localStorage.getItem('mockEmployees') || '[]');
};

const setMockEmployees = (employees: Employee[]) => {
  localStorage.setItem('mockEmployees', JSON.stringify(employees));
};

const PAGE_SIZE = 50;

const EmployeesIndex: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const emps = getMockEmployees();
      setEmployees(emps);
      setLoading(false);
    }, 200);
  }, []);

  const handleDelete = (id: string) => {
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    setMockEmployees(updated);
  };

  // Filtering
  const filtered = departmentFilter ? employees.filter(e => e.department === departmentFilter) : employees;
  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div className="max-w-full md:max-w-4xl mx-auto p-2 md:p-8">
      <div className="bg-white rounded-xl shadow-lg p-2 md:p-8">
        <h2 className="flex items-center gap-2 mb-6 text-lg md:text-2xl font-semibold">
          <FaUserTie className="text-blue-600" /> All Employees
        </h2>
        <nav className="sticky top-0 bg-gray-50 py-2 z-10 mb-6 border-b border-gray-200 flex flex-wrap gap-2 md:gap-4">
          <Link to="/admin/employees" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/employees' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-blue-700'}`}> <FaListUl /> List</Link>
          <Link to="/admin/employees/create" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/employees/create' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-green-700'}`}> <FaPlus /> Create</Link>
          <Link to="/admin/employees/departments" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/employees/departments' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-teal-700'}`}> <FaBuilding /> Departments</Link>
        </nav>
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          <label className="font-medium">Filter by Department:</label>
          <select value={departmentFilter} onChange={e => {setDepartmentFilter(e.target.value);setPage(1);}} className="p-2 rounded-md border border-gray-300 w-full md:w-auto">
            <option value="">All</option>
            {DEPARTMENTS.map(dep => <option key={dep.name} value={dep.name}>{dep.name}</option>)}
          </select>
        </div>
        {loading ? (
          <div>Loading employees...</div>
        ) : paginated.length === 0 ? (
          <div>No employees found.</div>
        ) : (
          <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm text-sm md:text-base">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 border border-gray-200 text-left"><FaUserTie /> Name</th>
                  <th className="p-3 border border-gray-200 text-left"><FaEnvelope /> Email</th>
                  <th className="p-3 border border-gray-200 text-left"><FaBuilding /> Department</th>
                  <th className="p-3 border border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((emp, idx) => (
                  <tr key={emp.id} className={idx%2===1 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border border-gray-200">
                      <Link to={`/admin/employees/${emp.id}`} className="text-blue-700 font-medium">{emp.name}</Link>
                    </td>
                    <td className="p-3 border border-gray-200">{emp.email}</td>
                    <td className="p-3 border border-gray-200">{emp.department}</td>
                    <td className="p-3 border border-gray-200 flex gap-2 flex-wrap">
                      <Link to={`/admin/employees/${emp.id}`} title="View" className="text-teal-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"><FaEye /></Link>
                      <Link to={`/admin/employees/${emp.id}/edit`} title="Edit" className="text-blue-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"><FaRegEdit /></Link>
                      <button onClick={() => handleDelete(emp.id)} title="Delete" className="text-red-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1 cursor-pointer border-0"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-blue-700 font-medium disabled:opacity-50">Prev</button>
            <span className="self-center">Page {page} of {totalPages}</span>
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-blue-700 font-medium disabled:opacity-50">Next</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeesIndex;

export { default as EmployeesIndex } from './index';
export { default as EmployeeDetails } from './details';
export { default as EmployeeCreate } from './create';
export { default as EmployeeEdit } from './edit';
export { default as EmployeeDocuments } from './documents';
export { default as DepartmentsList } from './departments';
