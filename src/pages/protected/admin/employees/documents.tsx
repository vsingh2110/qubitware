import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaTrash, FaArrowLeft, FaDownload } from 'react-icons/fa';

const getEmployeeDocuments = (id: string) => {
  const allDocs = JSON.parse(localStorage.getItem('employeeDocuments') || '{}');
  return allDocs[id] || [];
};
const setEmployeeDocuments = (id: string, docs: any[]) => {
  const allDocs = JSON.parse(localStorage.getItem('employeeDocuments') || '{}');
  allDocs[id] = docs;
  localStorage.setItem('employeeDocuments', JSON.stringify(allDocs));
};

const EmployeeDocuments: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) setDocuments(getEmployeeDocuments(id));
  }, [id]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && id) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        const dataUrl = ev.target?.result;
        const newDoc = {
          name: file.name,
          type: file.type,
          size: file.size,
          uploaded: new Date().toISOString(),
          dataUrl: dataUrl,
        };
        const updatedDocs = [...documents, newDoc];
        setEmployeeDocuments(id, updatedDocs);
        setDocuments(updatedDocs);
        setMessage('Document uploaded!');
        setFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (docIdx: number) => {
    if (!id) return;
    const updatedDocs = documents.filter((_, i) => i !== docIdx);
    setEmployeeDocuments(id, updatedDocs);
    setDocuments(updatedDocs);
  };

  return (
    <div className="max-w-lg w-full mx-auto px-2 sm:px-0 mt-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <FaFileAlt className="text-teal-600 text-xl" />
          <h2 className="text-xl font-bold text-gray-800">Employee Documents</h2>
        </div>
        <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={!file}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FaUpload /> Upload
          </button>
        </form>
        {message && <div className="mb-4 text-green-600 font-medium">{message}</div>}
        <ul className="divide-y divide-gray-100 mb-6">
          {documents.length === 0 ? (
            <li className="py-3 text-gray-500">No documents uploaded.</li>
          ) : (
            documents.map((doc, i) => (
              <li key={i} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-slate-500" />
                  <span className="font-semibold text-gray-800">{doc.name}</span>
                  <span className="text-xs text-gray-500">({doc.type || 'unknown'}, {Math.round(doc.size/1024)} KB)</span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {doc.dataUrl && (
                    <a
                      href={doc.dataUrl}
                      download={doc.name}
                      className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200 text-sm font-medium"
                    >
                      <FaDownload /> Download
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(i)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-slate-500 font-medium transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeDocuments;
