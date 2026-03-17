import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function GenerateQR() {
  const [formData, setFormData] = useState({
    studentName: '',
    registrationNumber: '',
    courseName: '',
    issuingInstitution: '',
    issueDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'studentName') {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    }
    
    if (name === 'registrationNumber') {
      const regex = /^[A-Za-z0-9]*$/;
      if (!regex.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const isFormComplete = formData.studentName && formData.registrationNumber && formData.courseName && formData.issuingInstitution && formData.issueDate;

  const downloadQR = () => {
    const canvas = document.getElementById('cert-qr-code');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    
    const formattedName = formData.studentName.trim().replace(/\s+/g, '_');
    downloadLink.download = `${formattedName}_qr_certisure.png`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="upload-container">
      <h2>Generate Secure QR</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
        Enter student details to encode into the certificate QR
      </p>
      
      <div className="form-controls">
        <input 
          type="text" name="studentName" placeholder="Student Name" 
          value={formData.studentName} onChange={handleChange} required 
        />
        <input 
          type="text" name="registrationNumber" placeholder="Registration Number (e.g., VTMT2026)" 
          value={formData.registrationNumber} onChange={handleChange} required 
        />
        <input 
          type="text" name="courseName" placeholder="Course Name" 
          value={formData.courseName} onChange={handleChange} required 
        />
        <input 
          type="text" name="issuingInstitution" placeholder="Institution Name" 
          value={formData.issuingInstitution} onChange={handleChange} required 
        />
        <input 
          type="date" name="issueDate" 
          value={formData.issueDate} onChange={handleChange} required 
        />
      </div>

      {isFormComplete && (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', animation: 'fadeIn 0.5s ease-in' }}>
          <div style={{ padding: '15px', background: 'white', borderRadius: '12px', display: 'inline-block' }}>
            <QRCodeCanvas 
              id="cert-qr-code" 
              value={JSON.stringify(formData)} 
              size={200} 
              level={"H"} 
              includeMargin={true}
            />
          </div>
          
          <button onClick={downloadQR}>
            Download QR Image
          </button>
        </div>
      )}
    </div>
  );
}