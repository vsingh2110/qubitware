import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaRegEdit, FaFileAlt, FaArrowLeft } from 'react-icons/fa';

const getMockApplicants = () => JSON.parse(localStorage.getItem('mockApplicants') || '[]');

const ApplicantDetails: React.FC = () => {
  const { id } = useParams();
  const applicant = getMockApplicants().find((a: any) => a.id === id);

  if (!applicant) return <div style={{textAlign:'center',marginTop:48}}>Applicant not found.</div>;

  return (
    <div style={{maxWidth:500,margin:'2rem auto',padding:0}}>
      <div style={{background:'#fff',borderRadius:12,boxShadow:'0 2px 16px #e5e7eb',padding:32}}>
        <h2 style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
          <FaUser style={{color:'#2563eb'}} /> Applicant Details
        </h2>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
          <FaUser style={{color:'#64748b'}} />
          <span style={{fontWeight:600}}>Name:</span> {applicant.name}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
          <FaEnvelope style={{color:'#64748b'}} />
          <span style={{fontWeight:600}}>Email:</span> {applicant.email}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}>
          <FaFileAlt style={{color:'#64748b'}} />
          <span style={{fontWeight:600}}>Status:</span> {applicant.status}
        </div>
        <div style={{display:'flex',gap:12,marginTop:16,justifyContent:'flex-end'}}>
          <Link to={`/admin/applicants/${applicant.id}/edit`} style={{display:'flex',alignItems:'center',gap:6,background:'#f1f5f9',padding:'8px 14px',borderRadius:6,textDecoration:'none',color:'#2563eb',fontWeight:500}}>
            <FaRegEdit /> Edit
          </Link>
          <Link to={`/admin/applicants/${applicant.id}/resume`} style={{display:'flex',alignItems:'center',gap:6,background:'#f1f5f9',padding:'8px 14px',borderRadius:6,textDecoration:'none',color:'#0d9488',fontWeight:500}}>
            <FaFileAlt /> Resume
          </Link>
          <Link to="/admin/applicants" style={{display:'flex',alignItems:'center',gap:6,background:'#f1f5f9',padding:'8px 14px',borderRadius:6,textDecoration:'none',color:'#64748b',fontWeight:500}}>
            <FaArrowLeft /> Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
