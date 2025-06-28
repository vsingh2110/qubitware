import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from './config/routes';

const App: React.FC = () => {
  return (
    <div>
      <header style={{padding: '1rem', background: '#222', color: '#fff', textAlign: 'center'}}>
        <h1>Qubitware Recruitment Portal</h1>
        <nav style={{marginTop: '1rem'}}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/admin/employees">Employees</Link> |{' '}
          <Link to="/admin/users">Users</Link> |{' '}
          <Link to="/admin/applicants">Applicants</Link>
        </nav>
      </header>
      <main style={{padding: '2rem'}}>
        <AppRoutes />
      </main>
      <footer style={{padding: '1rem', background: '#222', color: '#fff', textAlign: 'center'}}>
        <small>&copy; 2025 Qubitware. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default App;
