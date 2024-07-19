"use client";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Checkbox, Button, FormControlLabel } from "@mui/material";
import { _getById } from "../../../../utils/apiUtils";
import { useSearchParams } from "next/navigation";

const fields = [
  { name: "country_id", label: "Country", type: "text" },
  { name: "state_id", label: "State", type: "text" },
  { name: "district_id", label: "District", type: "text" },
  { name: "city_id", label: "City", type: "text" },
  { name: "postal_id", label: "Zip/Postal Code", type: "text" },
  { name: "house_type", label: "House Type", type: "select" },
  { name: "stay_from_date", label: "Stay From Date", type: "date" },
  { name: "stay_till_date", label: "Stay Till Date", type: "date" },
  { name: "full_address", label: "Full Address", type: "text" }
];

const PermanentAddress = ({ formData, setFormData }) => {
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [showCurrentAddressForm, setShowCurrentAddressForm] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let addressData = await _getById(`/candidate-address`, id);
          addressData = addressData.length > 0 ? addressData[0] : {};
          setFormData(addressData);
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (isSameAddress) {
      const updatedCurrentAddress = {};
      fields.forEach((field) => {
        updatedCurrentAddress[`current_${field.name}`] = formData[field.name];
      });

      setFormData((prevData) => ({
        ...prevData,
        ...updatedCurrentAddress,
      }));
    } else {
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        fields.forEach((field) => {
          updatedData[`current_${field.name}`] = '';
        });
        return updatedData;
      });
    }
  }, [isSameAddress, formData]);

  const handleCheckboxChange = (event) => {
    setIsSameAddress(event.target.checked);
  };

  const handleAddAddressClick = () => {
    setShowCurrentAddressForm(true);
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
                onChange={(event) => setFormData((prevData) => ({ ...prevData, [field.name]: event.target.value }))}
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="owned">Owned</MenuItem>
                <MenuItem value="rented">Rented</MenuItem>
              </TextField>
            ) : (
              <TextField
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(event) => setFormData((prevData) => ({ ...prevData, [field.name]: event.target.value }))}
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

      {!showCurrentAddressForm && (
        <Button variant="contained" color="primary" onClick={handleAddAddressClick}>
          Add Current Address
        </Button>
      )}

      {showCurrentAddressForm && (
        <div style={{ marginTop: '16px' }}>
          <FormControlLabel
            control={<Checkbox checked={isSameAddress} onChange={handleCheckboxChange} />}
            label="Same as permanent address"
          />
          <h3>Current Address</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {fields.map((field, index) => (
              <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
                {field.type === "select" ? (
                  <TextField
                    select
                    name={`current_${field.name}`}
                    value={formData[`current_${field.name}`] || ''}
                    onChange={(event) => setFormData((prevData) => ({ ...prevData, [`current_${field.name}`]: event.target.value }))}
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="owned">Owned</MenuItem>
                    <MenuItem value="rented">Rented</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    type={field.type}
                    name={`current_${field.name}`}
                    value={formData[`current_${field.name}`] || ''}
                    onChange={(event) => setFormData((prevData) => ({ ...prevData, [`current_${field.name}`]: event.target.value }))}
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
      )}
    </div>
  );
};

export default PermanentAddress;
