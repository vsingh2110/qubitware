import React from 'react';
import { useParams } from 'react-router-dom';

const getMockUsers = () => JSON.parse(localStorage.getItem('mockUsers') || '[]');

const UserPermissions: React.FC = () => {
  const { id } = useParams();
  const user = getMockUsers().find((u: any) => u.id === id);

  if (!user) return <div>User not found.</div>;

  // Placeholder: Permissions logic to be implemented later
  return (
    <div style={{maxWidth:600,margin:'0 auto',padding:24}}>
      <h2>User Permissions</h2>
      <div><b>Name:</b> {user.name}</div>
      <div><b>Role:</b> {user.role}</div>
      <div style={{marginTop:16}}>
        <i>Permissions feature coming soon...</i>
      </div>
    </div>
  );
};

export default UserPermissions;
