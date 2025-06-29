import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaClipboardList, FaEye, FaRegEdit, FaTrash, FaPlus, FaListUl } from 'react-icons/fa';

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
    <div className="max-w-full md:max-w-4xl mx-auto p-2 md:p-8">
      <div className="bg-white rounded-xl shadow-lg p-2 md:p-8">
        <h2 className="flex items-center gap-2 mb-6 text-lg md:text-2xl font-semibold">
          <FaClipboardList className="text-blue-600" /> All Applicants
        </h2>
        <nav className="sticky top-0 bg-gray-50 py-2 z-10 mb-6 border-b border-gray-200 flex flex-wrap gap-2 md:gap-4">
          <Link to="/admin/applicants" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/applicants' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-blue-700'}`}><FaListUl /> List</Link>
          <Link to="/admin/applicants/create" className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${location.pathname==='/admin/applicants/create' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-green-700'}`}><FaPlus /> Create</Link>
        </nav>
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          <label className="font-medium">Filter by Status:</label>
          <select value={statusFilter} onChange={e => {setStatusFilter(e.target.value);setPage(1);}} className="p-2 rounded-md border border-gray-300 w-full md:w-auto">
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
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
            {/* Mobile scroll hint */}
            <div className="block md:hidden text-xs text-gray-400 mb-2 ml-1">Swipe to scroll table &rarr;</div>
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm text-sm md:text-base">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 border border-gray-200 text-left"><FaUser /> Name</th>
                  <th className="p-3 border border-gray-200 text-left"><FaEnvelope /> Email</th>
                  <th className="p-3 border border-gray-200 text-left"><FaClipboardList /> Status</th>
                  <th className="p-3 border border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((applicant, idx) => (
                  <tr key={applicant.id} className={idx%2===1 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border border-gray-200">
                      <Link to={`/admin/applicants/${applicant.id}`} className="text-blue-700 font-medium">{applicant.name}</Link>
                    </td>
                    <td className="p-3 border border-gray-200">{applicant.email}</td>
                    <td className="p-3 border border-gray-200">{applicant.status.replace('_',' ').toUpperCase()}</td>
                    <td className="p-3 border border-gray-200 flex gap-2 flex-wrap">
                      <Link to={`/admin/applicants/${applicant.id}`} title="View" className="text-teal-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"><FaEye /></Link>
                      <Link to={`/admin/applicants/${applicant.id}/edit`} title="Edit" className="text-blue-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"><FaRegEdit /></Link>
                      <button onClick={() => handleDelete(applicant.id)} title="Delete" className="text-red-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1 cursor-pointer border-0"><FaTrash /></button>
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

export default ApplicantsIndex;
