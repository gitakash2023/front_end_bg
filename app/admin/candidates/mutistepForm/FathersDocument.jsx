import React from 'react';
import { TextField } from '@mui/material';

const FathersDocument = ({ handleChange, formData }) => {
  const fields = [
    { name: "uanNumber", label: "UAN Number", type: "text" },
    { name: "aadharNumber", label: "Aadhaar Card Number", type: "text" },
    { name: "aadharUpload", label: "Upload Aadhaar Card (1 MB)", type: "file" },
    { name: "panNumber", label: "PAN Card Number", type: "text" },
    { name: "panUpload", label: "Upload PAN Card (1 MB)", type: "file" },
    { name: "passportNumber", label: "Passport Number", type: "text" },
    { name: "passportUpload", label: "Upload Passport (1 MB)", type: "file" },
    { name: "drivingLicenseNumber", label: "Driving License Number", type: "text" },
    { name: "drivingLicenseUpload", label: "Upload Driving License (1 MB)", type: "file" },
    { name: "resumeUpload", label: "Upload Resume (1 MB)", type: "file" }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '300px' }}>
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
            InputProps={field.type === "file" ? { inputProps: { accept: ".pdf, .png, .jpg, .jpeg" } } : {}}
          />
        </div>
      ))}
    </div>
  );
};

export default FathersDocument;
