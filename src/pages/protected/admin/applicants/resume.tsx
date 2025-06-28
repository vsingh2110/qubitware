import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');
const setMockApplicants = (apps: any[]) => localStorage.setItem('mockApplicants', JSON.stringify(apps));

const ApplicantResume: React.FC = () => {
  const { id } = useParams();
  const applicant = getMockApplicants().find((a: any) => a.id === id);
  const [message, setMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  if (!applicant) return <div>Applicant not found.</div>;

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setMessage('Please select a file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(ev) {
      const dataUrl = ev.target?.result;
      const updated = getMockApplicants().map((a: any) =>
        a.id === id ? { ...a, resume: file.name, resumeData: dataUrl } : a
      );
      setMockApplicants(updated);
      setMessage('Resume uploaded!');
    };
    reader.readAsDataURL(file);
  };

  // Refresh applicant data after upload
  const currentApplicant = getMockApplicants().find((a: any) => a.id === id);

  return (
    <div style={{maxWidth:600,margin:'0 auto',padding:24}}>
      <h2>Applicant Resume</h2>
      <div><b>Name:</b> {currentApplicant.name}</div>
      <div style={{marginTop:16}}>
        <form onSubmit={handleUpload}>
          <input type="file" ref={fileInput} accept=".pdf,.doc,.docx" />
          <button type="submit">Upload Resume</button>
        </form>
        {currentApplicant.resume && (
          <div style={{marginTop:8}}>
            <b>Uploaded Resume:</b> {currentApplicant.resume}
            {currentApplicant.resumeData && (
              <div style={{marginTop:4}}>
                <a href={currentApplicant.resumeData} download={currentApplicant.resume}>
                  Download Resume
                </a>
              </div>
            )}
          </div>
        )}
        {message && <div style={{marginTop:8}}>{message}</div>}
      </div>
    </div>
  );
};

export default ApplicantResume;
