"use client";
import React, { useState } from "react";
import { TextField, MenuItem, CircularProgress, FormHelperText } from "@mui/material";
import { useSearchParams } from "next/navigation";
import DateFormate from "../../../../common-components/DateFormate";

const fields = [
  { name: "country_id", label: "Country", type: "text" },
  { name: "state_id", label: "State", type: "text" },
  { name: "district_id", label: "District", type: "text" },
  { name: "city_id", label: "City", type: "text" },
  { name: "postal_id", label: "Zip/Postal Code", type: "text" },
  { name: "house_type", label: "House Type", type: "select", options: ["Owned", "Rented"] },
  { name: "stay_from_date", label: "Stay From Date", type: "date" },
  { name: "stay_till_date", label: "Stay Till Date", type: "date" },
  { name: "full_address", label: "Full Address", type: "text" },
  { name: "address_proof_file", label: "Upload Address Proof", type: "file" }
];

const PermanentAddress = ({ formData, setFormData }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [fileError, setFileError] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFileError("File size exceeds 5MB.");
        return;
      }
      if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
        setFileError("Invalid file type. Only PDF, DOC, DOCX are allowed.");
        return;
      }
      setFileError(null);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        setFormData((prevData) => ({
          ...prevData,
          [name]: blob
        }));
      };
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {fields.map((field, index) => (
          <div key={index} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
            {field.type === "select" ? (
              <TextField
                select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : field.type === "date" ? (
              <DateFormate
                name={field.name}
                label={field.label}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ) : field.type === "file" ? (
              <div>
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
                      accept: ".pdf,.doc,.docx"
                    }
                  }}
                />
                {fileError && <FormHelperText error>{fileError}</FormHelperText>}
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
    </div>
  );
};

export default PermanentAddress;
