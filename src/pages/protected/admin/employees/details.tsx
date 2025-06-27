import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const getMockEmployees = () => JSON.parse(localStorage.getItem('mockEmployees') || '[]');

const EmployeeDetails: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    setEmployee(getMockEmployees().find((e: any) => e.id === id));
  }, [id]);

  if (!employee) return <div>Employee not found.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <div style={{ background: '#f8f9fa', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
        <h2 style={{ marginBottom: 16 }}>Employee Details</h2>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <div style={{ marginTop: 16 }}>
          <Link to={`/admin/employees/${id}/edit`} style={{ marginRight: 12 }}>
            ✏️ Edit
          </Link>
          <Link to={`/admin/employees/${id}/documents`}>📄 Documents</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
