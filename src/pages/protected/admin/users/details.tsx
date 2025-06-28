import React from 'react';
import { useParams, Link } from 'react-router-dom';

const getMockUsers = () => JSON.parse(localStorage.getItem('mockUsers') || '[]');

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const user = getMockUsers().find((u: any) => u.id === id);

  if (!user) return <div>User not found.</div>;

  return (
    <div style={{maxWidth:600,margin:'0 auto',padding:24}}>
      <h2>User Details</h2>
      <div><b>Name:</b> {user.name}</div>
      <div><b>Email:</b> {user.email}</div>
      <div><b>Role:</b> {user.role}</div>
      <div style={{marginTop:16}}>
        <Link to={`/admin/users/${user.id}/edit`}>Edit</Link> |{' '}
        <Link to="/admin/users">Back to Users</Link>
      </div>
    </div>
  );
};

export default UserDetails;
