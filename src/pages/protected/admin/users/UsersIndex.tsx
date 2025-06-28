import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    <div style={{maxWidth:700,margin:'0 auto',padding:24}}>
      <h2 style={{marginBottom:16}}>All Users</h2>
      <nav style={{position:'sticky',top:0,background:'#f8f9fa',padding:'8px 0',zIndex:10,marginBottom:16,borderBottom:'1px solid #eee'}}>
        <Link to="/admin/users" style={{marginRight:12,fontWeight:location.pathname==='/admin/users'?'bold':'normal'}}>List</Link>
        <Link to="/admin/users/create" style={{marginRight:12,fontWeight:location.pathname==='/admin/users/create'?'bold':'normal'}}>Create</Link>
      </nav>
      <div style={{marginBottom:16}}>
        <label>Filter by Role: </label>
        <select value={roleFilter} onChange={e => {setRoleFilter(e.target.value);setPage(1);}}>
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
        <table style={{width:'100%',borderCollapse:'collapse',background:'#fff',boxShadow:'0 2px 8px #eee'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/admin/users/${user.id}`}>View</Link> |{' '}
                  <Link to={`/admin/users/${user.id}/edit`}>Edit</Link> |{' '}
                  <button onClick={() => handleDelete(user.id)} style={{color:'red',background:'none',border:'none',cursor:'pointer'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:16,display:'flex',justifyContent:'center',gap:8}}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
        </div>
        </>
      )}
    </div>
  );
};

export default UsersIndex;
