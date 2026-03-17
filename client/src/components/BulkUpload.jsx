import React, { useState } from 'react';
import Papa from 'papaparse';
import { QRCodeCanvas } from 'qrcode.react';

export default function BulkUpload() {
  const [parsedData, setParsedData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Ensure the CSV has the right columns
        const validData = results.data.filter(row => row.studentName && row.registrationNumber);
        setParsedData(validData);
      }
    });
  };

  const downloadAllQRs = () => {
    parsedData.forEach((student, index) => {
      setTimeout(() => {
        const canvas = document.getElementById(`qr-${index}`);
        if (canvas) {
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `${student.registrationNumber}_QR.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      }, index * 300); // 300ms delay between downloads to prevent browser blocking
    });
  };

  return (
    <div className="upload-container" style={{ maxWidth: '800px' }}>
      <h2>Bulk Certificate Generation</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
        Upload a CSV file containing: studentName, registrationNumber, courseName, issuingInstitution, issueDate
      </p>

      <div className="form-controls">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
        />
      </div>

      {parsedData.length > 0 && (
        <div style={{ marginTop: '30px', animation: 'fadeIn 0.5s ease-in' }}>
          <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '15px' }}>
            Generated {parsedData.length} Certificates
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
            {parsedData.map((student, index) => (
              <div key={index} style={{ background: 'white', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <QRCodeCanvas 
                  id={`qr-${index}`}
                  value={JSON.stringify(student)} 
                  size={100} 
                  level={"H"} 
                  includeMargin={true}
                />
                <span style={{ color: '#333', fontSize: '0.8rem', marginTop: '8px', fontWeight: 'bold' }}>
                  {student.registrationNumber}
                </span>
              </div>
            ))}
          </div>

          <button onClick={downloadAllQRs} style={{ marginTop: '20px' }}>
            Download All {parsedData.length} QR Codes
          </button>
        </div>
      )}
    </div>
  );
}
