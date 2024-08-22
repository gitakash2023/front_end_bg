import React from 'react';
import TextField from '@mui/material/TextField';

const OtherReferenceInformation = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Debugging
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    console.log("Component re-rendered with formData:", formData); // Debugging
  }, [formData]);

  const fields = [
    { name: "ref_name", label: "Reference Name", type: "text" },
    { name: "ref_designation", label: "Reference Designation", type: "text" },
    { name: "company_name", label: "Reference Company Name", type: "text" },
    { name: "ref_contact_num", label: "Reference Contact Number", type: "text" },
    { name: "ref_email", label: "Reference Email", type: "email" },
    { name: "ref_relationship", label: "Relationship to Candidate", type: "text" },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
          <TextField
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''} // Ensure this is set correctly
            onChange={handleChange}
            label={field.label}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </div>
      ))}
    </div>
  );
}

export default OtherReferenceInformation;
