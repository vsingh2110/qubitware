import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

const EmployeesIndex: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{maxWidth:700,margin:'0 auto',padding:24}}>
      <h2 style={{marginBottom:16}}>All Employees</h2>
      <div style={{marginBottom:16}}>
        <Link to="/admin/employees/create" style={{marginRight:12}}>➕ Create Employee</Link>
        <Link to="/admin/employees/departments">🏢 Departments</Link>
      </div>
      {loading ? (
        <div>Loading employees...</div>
      ) : employees.length === 0 ? (
        <div>No employees found.</div>
      ) : (
        <table style={{width:'100%',borderCollapse:'collapse',background:'#fff',boxShadow:'0 2px 8px #eee'}}>
          <thead>
            <tr style={{background:'#f8f9fa'}}>
              <th style={{padding:8,border:'1px solid #eee'}}>Name</th>
              <th style={{padding:8,border:'1px solid #eee'}}>Email</th>
              <th style={{padding:8,border:'1px solid #eee'}}>Department</th>
              <th style={{padding:8,border:'1px solid #eee'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td style={{padding:8,border:'1px solid #eee'}}>
                  <Link to={`/admin/employees/${emp.id}`}>{emp.name}</Link>
                </td>
                <td style={{padding:8,border:'1px solid #eee'}}>{emp.email}</td>
                <td style={{padding:8,border:'1px solid #eee'}}>{emp.department}</td>
                <td style={{padding:8,border:'1px solid #eee'}}>
                  <Link to={`/admin/employees/${emp.id}`}>View</Link>{' | '}
                  <Link to={`/admin/employees/${emp.id}/edit`}>Edit</Link>{' | '}
                  <button onClick={() => handleDelete(emp.id)} style={{color:'#c00',background:'none',border:'none',cursor:'pointer'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
