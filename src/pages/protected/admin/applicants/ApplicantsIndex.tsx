import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Applicant {
  id: string;
  name: string;
  email: string;
  status: string;
}

const STATUS_VALUES = [
  'applied',
  'screening',
  'interview_scheduled',
  'interview_completed',
  'assessment',
  'offer_pending',
  'offer_sent',
  'hired',
  'rejected',
  'withdrawn'
];

const PAGE_SIZE = 50;

const getMockApplicants = (): Applicant[] => {
  return JSON.parse(localStorage.getItem('mockApplicants') || '[]');
};

const setMockApplicants = (applicants: Applicant[]) => {
  localStorage.setItem('mockApplicants', JSON.stringify(applicants));
};

const ApplicantsIndex: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const apps = getMockApplicants();
      setApplicants(apps);
      setLoading(false);
    }, 200);
  }, []);

  const handleDelete = (id: string) => {
    const updated = applicants.filter(a => a.id !== id);
    setApplicants(updated);
    setMockApplicants(updated);
  };

  // Filtering
  const filtered = statusFilter ? applicants.filter(a => a.status === statusFilter) : applicants;
  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div style={{maxWidth:700,margin:'0 auto',padding:24}}>
      <h2 style={{marginBottom:16}}>All Applicants</h2>
      <nav style={{position:'sticky',top:0,background:'#f8f9fa',padding:'8px 0',zIndex:10,marginBottom:16,borderBottom:'1px solid #eee'}}>
        <Link to="/admin/applicants" style={{marginRight:12,fontWeight:location.pathname==='/admin/applicants'?'bold':'normal'}}>List</Link>
        <Link to="/admin/applicants/create" style={{marginRight:12,fontWeight:location.pathname==='/admin/applicants/create'?'bold':'normal'}}>Create</Link>
      </nav>
      <div style={{marginBottom:16}}>
        <label>Filter by Status: </label>
        <select value={statusFilter} onChange={e => {setStatusFilter(e.target.value);setPage(1);}}>
          <option value="">All</option>
          {STATUS_VALUES.map(s => <option key={s} value={s}>{s.replace('_',' ').toUpperCase()}</option>)}
        </select>
      </div>
      {loading ? (
        <div>Loading applicants...</div>
      ) : paginated.length === 0 ? (
        <div>No applicants found.</div>
      ) : (
        <>
        <table style={{width:'100%',borderCollapse:'collapse',background:'#fff',boxShadow:'0 2px 8px #eee'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(applicant => (
              <tr key={applicant.id}>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.status}</td>
                <td>
                  <Link to={`/admin/applicants/${applicant.id}`}>View</Link> |{' '}
                  <Link to={`/admin/applicants/${applicant.id}/edit`}>Edit</Link> |{' '}
                  <button onClick={() => handleDelete(applicant.id)} style={{color:'red',background:'none',border:'none',cursor:'pointer'}}>Delete</button>
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

export default ApplicantsIndex;
