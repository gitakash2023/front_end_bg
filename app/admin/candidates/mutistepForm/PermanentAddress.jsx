"use client";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
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
  useEffect(() => {
    // Update the state when the file is set
    if (address.address_proof_file) {
      onChange(index, { ...address });
    }
  }, [address.address_proof_file, index, onChange]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append(name, file);

      // Updating form data with the new file
      onChange(index, { ...address, address_proof_file: formData.get(name) });
    } else {
      // Updating form data with text values
      onChange(index, { ...address, [name]: value });
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
                {address.address_proof_file && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Uploaded file:</strong> {address.address_proof_file.name}
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
          address_proof_file: "",
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
          address_proof_file: "",
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
          address_proof_file: "",
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
