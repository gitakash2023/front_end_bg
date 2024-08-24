"use client";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, FormHelperText, Button } from "@mui/material";
import DateFormate from "../../../../common-components/DateFormate";

const cibilFields = [
  { name: "pan_number", label: "PAN Number", type: "text" },
  { name: "pan_card", label: "Upload PAN Card", type: "file" },
  { name: "cibil_score", label: "CIBIL Score", type: "text" },
  { name: "cibil_report", label: "Upload CIBIL Report", type: "file" },
  { name: "aadhar_number", label: "Aadhar Number", type: "text" },
  { name: "aadhar_card", label: "Upload Aadhar Card", type: "file" },
];

const CIBILForm = ({ cibil, onChange, index, heading }) => {
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    // Update the state when any file is set
    const fileFields = ['pan_card', 'cibil_report', 'aadhar_card'];
    fileFields.forEach(field => {
      if (cibil[field]) {
        onChange(index, { ...cibil });
      }
    });
  }, [cibil.pan_card, cibil.cibil_report, cibil.aadhar_card, index, onChange]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append(name, file);

      // Updating form data with the new file
      onChange(index, { ...cibil, [name]: formData.get(name) });
    } else {
      // Updating form data with text values
      onChange(index, { ...cibil, [name]: value });
    }
  };

  const renderFileField = (field) => {
    const fileExists = cibil[field.name] && typeof cibil[field.name] === 'string';
    
    const handlePreviewClick = (e) => {
      e.preventDefault();
      if (cibil[field.name]) {
        // Use a more dynamic approach for the URL
        const fileUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://bgv-backend.vitsinco.com/'}${cibil[field.name]}`;
        
        // Open in a new window and check if it loaded successfully
        const newWindow = window.open(fileUrl, '_blank');
        
        if (newWindow) {
          newWindow.onload = () => {
            if (newWindow.location.href === 'about:blank') {
              alert('File could not be loaded. Please check if the file exists on the server.');
            }
          };
        } else {
          alert('Pop-up blocker might be enabled. Please allow pop-ups for this site to preview files.');
        }
      } else {
        alert('No file available for preview.');
      }
    };

    return (
      <div>
        {fileExists && (
          <div style={{ marginBottom: '8px' }}>
            <strong>Uploaded file:</strong> {cibil[`${field.name}_name`] || 'File'}
            <Button onClick={handlePreviewClick}>Preview</Button>
          </div>
        )}
        <TextField
          type="file"
          name={field.name}
          onChange={handleChange}
          label={field.label}
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png"
            }
          }}
        />
        {fileError && <FormHelperText error>{fileError}</FormHelperText>}
      </div>
    );
  };

  return (
    <div className="my-5">
      <h2>{heading} CIBIL Information</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {cibilFields.map((field, idx) => (
          <div key={idx} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
            {field.type === "file" ? (
              renderFileField(field)
            ) : (
              <TextField
                type={field.type}
                name={field.name}
                value={cibil[field.name] || ''}
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
    </div>
  );
};

const CIBILInformation = ({ formData, setFormData, candidate_id }) => {
  useEffect(() => {
    if (formData.length === 0) {
      setFormData([
        {
          pan_number: '',
          pan_card: null,
          cibil_score: '',
          cibil_report: null,
          aadhar_number: '',
          aadhar_card: null,
          candidate_id
        }
      ]);
    }
  }, [formData, setFormData, candidate_id]);

  const handleCIBILChange = (index, updatedCIBIL) => {
    setFormData(formData.map((cibil, idx) => (idx === index ? updatedCIBIL : cibil)));
  };

  return (
    <div>
      {formData.map((cibil, index) => (
        <CIBILForm
          key={index}
          cibil={cibil}
          onChange={handleCIBILChange}
          index={index}
          heading="Candidate"
        />
      ))}
    </div>
  );
};

export default CIBILInformation;