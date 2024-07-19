import React from 'react';
import { TextField } from '@mui/material';

const FathersDocument = ({ handleChange, formData }) => {
  const fields = [
    { name: "aadharNumber", label: "Aadhaar Card Number", type: "text" },
    { name: "aadharUpload", label: "Upload Aadhaar Card (1 MB)", type: "file" },
    { name: "panNumber", label: "PAN Card Number", type: "text" },
    { name: "panUpload", label: "Upload PAN Card (1 MB)", type: "file" },
    { name: "drivingLicenseNumber", label: "Driving License Number", type: "text" },
    { name: "drivingLicenseUpload", label: "Upload Driving License", type: "file" },
  ];

  const handleFileChange = async (event) => {
    const { name, files } = event.target;

    if (files && files[0]) {
      try {
        const file = files[0];
        const fileBlob = await fileToBlob(file);
        console.log("File Blob:", fileBlob); // For debugging
        handleChange({ target: { name, value: fileBlob } });
      } catch (error) {
        console.error("Error selecting file:", error);
      }
    }
  };

  const fileToBlob = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer], { type: file.type });
        resolve(blob);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '300px' }}>
          <TextField
            type={field.type}
            name={field.name}
            value={field.type !== "file" ? (formData[field.name] || '') : undefined}
            onChange={field.type === "file" ? handleFileChange : handleChange}
            label={field.label}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={field.type === "file" ? { inputProps: { accept: ".pdf, .png, .jpg, .jpeg" } } : {}}
          />
        </div>
      ))}
    </div>
  );
};

export default FathersDocument;
