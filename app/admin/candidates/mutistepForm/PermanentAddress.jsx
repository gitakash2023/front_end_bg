"use client";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
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

const AddressForm = ({ address, onChange, index, heading }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (address.address_proof_file) {
      if (typeof address.address_proof_file === 'string') {
        setFilePreview(address.address_proof_file);
        setFileName('');
      } else {
        const fileUrl = URL.createObjectURL(address.address_proof_file);
        setFilePreview(fileUrl);
        setFileName(address.address_proof_file.name);

        return () => URL.revokeObjectURL(fileUrl);
      }
    } else {
      setFilePreview(null);
      setFileName('');
    }
  }, [address.address_proof_file]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
      onChange(index, { ...address, [name]: file });
    } else {
      onChange(index, { ...address, [name]: value });
    }
  };

  const handlePreviewClick = () => {
    const fileUrl = address.address_proof_file && typeof address.address_proof_file === 'string'
      ? address.address_proof_file
      : filePreview;
    
    if (fileUrl) {
      window.open(`https://bgv-backend.vitsinco.com/file?file=${fileUrl}`, '_blank');
    }
  };

  return (
    <div className="my-5">
      <h2>{heading} Address</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {fields.map((field, fieldIndex) => (
          <div key={fieldIndex} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
            {field.type === "select" ? (
              <TextField
                select
                name={field.name}
                value={address[field.name] || ''}
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
                value={address[field.name]}
                onChange={handleChange}
              />
            ) : field.type === "file" ? (
              <div>
                {filePreview && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Uploaded file:</strong>
                    {filePreview.startsWith('data:image/') ? (
                      <img src={filePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    ) : (
                      <>
                        <Button variant="contained" color="primary" onClick={handlePreviewClick}>
                          Preview
                        </Button>
                        <div style={{ marginTop: '8px' }}>
                          <strong>File Name:</strong> {fileName}
                        </div>
                      </>
                    )}
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
                />
              </div>
            ) : (
              <TextField
                type={field.type}
                name={field.name}
                value={address[field.name] || ''}
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

const AddressContainer = ({ formData, setFormData, candidate_id }) => {
  useEffect(() => {
    if (formData.length === 0) {
      setFormData([
        {
          country_id: "",
          state_id: "",
          district_id: "",
          city_id: "",
          postal_id: "",
          house_type: "",
          stay_from_date: "",
          stay_till_date: "",
          full_address: "",
          address_proof_file: null,
          address_type: "current",
          candidate_id
        },
        {
          country_id: "",
          state_id: "",
          district_id: "",
          city_id: "",
          postal_id: "",
          house_type: "",
          stay_from_date: "",
          stay_till_date: "",
          full_address: "",
          address_proof_file: null,
          address_type: "permanent",
          candidate_id
        },
        {
          country_id: "",
          state_id: "",
          district_id: "",
          city_id: "",
          postal_id: "",
          house_type: "",
          stay_from_date: "",
          stay_till_date: "",
          full_address: "",
          address_proof_file: null,
          address_type: "previous",
          candidate_id
        }
      ]);
    }
  }, [formData, setFormData, candidate_id]);

  const handleAddressChange = (index, updatedAddress) => {
    setFormData(formData.map((address, idx) =>
      idx === index ? updatedAddress : address
    ));
  };

  return (
    <div>
      {formData.map((address, index) => (
        <AddressForm
          key={index}
          address={address}
          onChange={handleAddressChange}
          index={index}
          heading={address.address_type}
        />
      ))}
    </div>
  );
};

export default AddressContainer;
