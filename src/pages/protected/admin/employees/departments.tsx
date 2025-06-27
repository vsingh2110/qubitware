import React, { useEffect, useState } from 'react';
// @ts-ignore
import { DEPARTMENTS } from '../../../../constants/departments';

const DepartmentsList: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDepartments(DEPARTMENTS);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Loading departments...</div>;

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map((dep: { name: string }, i) => (
          <li key={i}>{dep.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsList;
