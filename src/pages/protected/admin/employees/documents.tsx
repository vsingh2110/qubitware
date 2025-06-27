import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const [documents, setDocuments] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) setDocuments(getEmployeeDocuments(id));
  }, [id]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && id) {
      const newDoc = {
        name: file.name,
        type: file.type,
        size: file.size,
        uploaded: new Date().toISOString(),
      };
      const updatedDocs = [...documents, newDoc];
      setEmployeeDocuments(id, updatedDocs);
      setDocuments(updatedDocs);
      setMessage('Document uploaded!');
      setFile(null);
    }
  };

  const handleDelete = (docIdx: number) => {
    if (!id) return;
    const updatedDocs = documents.filter((_, i) => i !== docIdx);
    setEmployeeDocuments(id, updatedDocs);
    setDocuments(updatedDocs);
  };

  return (
    <div>
      <h2>Employee Documents</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button type="submit" disabled={!file}>Upload</button>
      </form>
      {message && <div>{message}</div>}
      <ul>
        {documents.map((doc, i) => (
          <li key={i} style={{marginBottom: 8}}>
            <strong>{doc.name}</strong> ({doc.type || 'unknown'}, {Math.round(doc.size/1024)} KB)
            <button style={{marginLeft: 8}} onClick={() => handleDelete(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDocuments;
