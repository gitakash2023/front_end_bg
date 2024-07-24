"use client";
import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
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
  { name: "full_address", label: "Full Address", type: "text" }
];

const PermanentAddress = ({ formData, setFormData }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {fields.map((field, index) => (
          <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
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
