import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        setFormData((prevData) => ({
          ...prevData,
          [name]: {
            blob: fileBlob,
            name: file.name,
          },
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
            <div>
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
              {formData[field.name] && formData[field.name].name && (
                <div style={{ marginTop: '8px' }}>
                  <Typography variant="body2">
                    <strong>Uploaded File:</strong> {formData[field.name].name}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={URL.createObjectURL(formData[field.name].blob)}
                    download={formData[field.name].name}
                    target="_blank"
                    style={{ marginTop: '4px' }}
                  >
                    Download
                  </Button>
                </div>
              )}
            </div>
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
};

export default CIBILInformation;