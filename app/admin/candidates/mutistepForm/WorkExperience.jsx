import React from 'react';
import { TextField } from '@mui/material';
import DateFormate from "../../../../common-components/DateFormate";

const WorkExperience = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      fileToBlob(file).then((blob) => {
        console.log(`${name} Blob:`, blob); // For debugging
        setFormData((prevData) => ({
          ...prevData,
          [name]: blob,
        }));
      }).catch((error) => {
        console.error("Error converting file to Blob:", error);
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
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

  const fields = [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "companyEmail", label: "Company Email ID", type: "email" },
    { name: "companyLocation", label: "Company Location", type: "text" },
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "designation", label: "Designation", type: "text" },
    { name: "from", label: "From", type: "date" },
    { name: "to", label: "To", type: "date" },
    { name: "salary", label: "Salary in CTC(LPA)", type: "text" },
    // { name: "salarySlip", label: "Upload Salary Slip", type: "file" },
    { name: "reasonForLeaving", label: "Reason for Leaving", type: "text" },
    // { name: "relievingLetter", label: "Upload Relieving Letter", type: "file" },
    // { name: "experienceLetter", label: "Upload Experience Letter", type: "file" },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '300px' }}>
          {field.type === "date" ? (
            <DateFormate
              name={field.name}
              label={field.label}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ) : (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
