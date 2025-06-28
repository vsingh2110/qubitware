import React, { useEffect, useState } from 'react';
import { FaBuilding, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { DEPARTMENTS } from '../../../../constants/departments';

const DepartmentsList: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setDepartments(DEPARTMENTS);
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return (
      <div className="text-center mt-12 text-gray-500">
        Loading departments...
      </div>
    );

  return (
    <div className="max-w-md w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-800">
          <FaBuilding className="text-teal-600" /> Departments
        </h2>
        <ul className="divide-y divide-gray-100 mb-6">
          {departments.map((dep: { name: string }, i) => (
            <li
              key={i}
              className="py-3 flex items-center gap-2 text-gray-700 font-medium"
            >
              <FaBuilding className="text-teal-500" /> {dep.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-md text-blue-600 font-medium transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
};

export default DepartmentsList;
