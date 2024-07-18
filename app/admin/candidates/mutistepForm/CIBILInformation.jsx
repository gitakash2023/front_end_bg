import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

const CIBILInformation = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const { name, files } = event.target;

    if (files && files[0]) {
      try {
        const file = files[0];
        const fileBlob = await fileToBlob(file);
        console.log("File Blob:", fileBlob);
        setFormData((prevData) => ({
          ...prevData,
          [name]: fileBlob,
        }));
      } catch (error) {
        console.error("Error selecting file:", error);
      }
    }
  };

  const fileToBlob = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        console.log("File read result:", result);
        resolve(result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const fields = [
    { name: "pan_number", label: "PAN Number", type: "text" },
    { name: "pan_card", label: "Upload PAN Card", type: "file" },
    { name: "cibil_score", label: "CIBIL Score", type: "text" },
    { name: "cibil_report", label: "Upload CIBIL Report", type: "file" },
    { name: "aadhar_number", label: "Aadhar Number", type: "text" },
    { name: "aadhar_card", label: "Upload Aadhar Card", type: "file" }, 
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
          {field.type === "file" ? (
            <TextField
              type="file"
              name={field.name}
              onChange={handleFileChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { accept: ".pdf, .png, .jpg, .jpeg" }, ref: fileInputRef }}
            />
          ) : (
            <TextField
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CIBILInformation;
