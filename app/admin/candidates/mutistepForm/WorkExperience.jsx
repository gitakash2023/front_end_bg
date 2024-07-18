import React from 'react';
import { TextField } from '@mui/material';

const WorkExperience = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file object directly
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fields = [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "companyEmail", label: "Company Email ID", type: "email" },
    { name: "companyLocation", label: "Company Location", type: "text" },
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "designation", label: "Designation", type: "text" },
    { name: "from", label: "From", type: "date" },
    { name: "to", label: "To", type: "date" },
    { name: "salary", label: "Salary in CTC", type: "text" },
    { name: "reasonForLeaving", label: "Reason for Leaving", type: "text" },
    { name: "experienceLetter", label: "Upload Experience Letter", type: "file" },
    { name: "salarySlip", label: "Upload Salary Slip", type: "file" },
    { name: "relievingLetter", label: "Upload Relieving Letter", type: "file" }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '300px' }}>
          <TextField
            type={field.type}
            name={field.name}
            value={field.type !== "file" ? (formData[field.name] || '') : undefined}
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

export default WorkExperience;
