import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUserShield, FaEye, FaRegEdit, FaTrash, FaPlus, FaListUl } from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ROLES = [
  'hr_manager',
  'recruiter',
  'interviewer',
  'admin'
];

const PAGE_SIZE = 50;

const getMockUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('mockUsers') || '[]');
};

const setMockUsers = (users: User[]) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

const UsersIndex: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const usrs = getMockUsers();
      setUsers(usrs);
      setLoading(false);
    }, 200);
  }, []);

  const handleDelete = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    setMockUsers(updated);
  };

  // Filtering
  const filtered = roleFilter ? users.filter(u => u.role === roleFilter) : users;
  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div className="max-w-full md:max-w-4xl mx-auto p-2 md:p-8">
      <div className="bg-white rounded-xl shadow-lg p-2 md:p-8">
        <h2 className="flex items-center gap-2 mb-6 text-lg md:text-2xl font-semibold">
          <FaUser className="text-blue-600" /> All Users
        </h2>
        <nav className="sticky top-0 bg-gray-50 py-2 z-10 mb-6 border-b border-gray-200 flex flex-wrap gap-2 md:gap-4">
          <Link to="/admin/users" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/users' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-blue-700'}`}><FaListUl /> List</Link>
          <Link to="/admin/users/create" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/users/create' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-green-700'}`}><FaPlus /> Create</Link>
        </nav>
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          <label className="font-medium">Filter by Role:</label>
          <select value={roleFilter} onChange={e => {setRoleFilter(e.target.value);setPage(1);}} className="p-2 rounded-md border border-gray-300 w-full md:w-auto">
            <option value="">All</option>
            {ROLES.map(r => <option key={r} value={r}>{r.replace('_',' ').toUpperCase()}</option>)}
          </select>
        </div>
        {loading ? (
          <div>Loading users...</div>
        ) : paginated.length === 0 ? (
          <div>No users found.</div>
        ) : (
          <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm text-sm md:text-base">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 border border-gray-200 text-left"><FaUser /> Name</th>
                  <th className="p-3 border border-gray-200 text-left"><FaEnvelope /> Email</th>
                  <th className="p-3 border border-gray-200 text-left"><FaUserShield /> Role</th>
                  <th className="p-3 border border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user, idx) => (
                  <tr key={user.id} className={idx%2===1 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border border-gray-200">
                      <Link to={`/admin/users/${user.id}`} className="text-blue-700 font-medium">{user.name}</Link>
                    </td>
                    <td className="p-3 border border-gray-200">{user.email}</td>
                    <td className="p-3 border border-gray-200">{user.role.replace('_',' ').toUpperCase()}</td>
                    <td className="p-3 border border-gray-200 flex gap-2 flex-wrap">
                      <Link to={`/admin/users/${user.id}`} title="View" className="text-teal-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"><FaEye /></Link>
                      <Link to={`/admin/users/${user.id}/edit`} title="Edit" className="text-blue-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"><FaRegEdit /></Link>
                      <button onClick={() => handleDelete(user.id)} title="Delete" className="text-red-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1 cursor-pointer border-0"><FaTrash /></button>
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

export default UsersIndex;
