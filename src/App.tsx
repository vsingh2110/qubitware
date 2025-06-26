import React from 'react';
import AppRoutes from './config/routes';

const App: React.FC = () => {
  return (
    <div>
      <header style={{padding: '1rem', background: '#222', color: '#fff', textAlign: 'center'}}>
        <h1>Qubitware Recruitment Portal</h1>
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
