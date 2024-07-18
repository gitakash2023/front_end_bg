// import React, { useState, useRef } from 'react';
// import { TextField, MenuItem, Checkbox, Button, FormControlLabel } from '@mui/material';

// const fields = [
//   { name: "full_address", label: "Full Address", type: "text" },
//   { name: "city_id", label: "City ", type: "text" },
//   { name: "state_id", label: "State ", type: "text" },
//   { name: "country_id", label: "Country ", type: "text" },
//   { name: "stay_from_date", label: "Stay From Date", type: "date" },
//   { name: "stay_till_date", label: "Stay Till Date", type: "date" },
//   { name: "house_type", label: "House Type", type: "select" },
//   { name: "address_type", label: "Address Type", type: "number" },
//   { name: "address_proof_file", label: "Address Proof File", type: "file" },
//   { name: "address_proof", label: "Address Proof", type: "number" },
//   { name: "court_verified", label: "Court Verified", type: "boolean" },
//   { name: "police_verified", label: "Police Verified", type: "boolean" },
//   // { name: "candidate_id", label: "Candidate ID", type: "number" },
// ];

// const PermanentAddress = ({ formData, setFormData }) => {
//   const fileInputRef = useRef(null);
//   const [isSameAddress, setIsSameAddress] = useState(false);
//   const [showCurrentAddressForm, setShowCurrentAddressForm] = useState(false);

//   const handleFileChange = async (event) => {
//     const { name, files } = event.target;

//     if (files && files[0]) {
//       try {
//         const file = files[0];
//         const fileBlob = await fileToBlob(file);
//         console.log("Address Blob:", fileBlob);
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: fileBlob,
//         }));
//       } catch (error) {
//         console.error("Error selecting file:", error);
//       }
//     }
//   };

//   const fileToBlob = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result;
//         console.log("File read result:", result);
//         resolve(result);
//       };
//       reader.onerror = (error) => {
//         console.error("Error reading file:", error);
//         reject(error);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleCheckboxChange = (event) => {
//     const checked = event.target.checked;
//     setIsSameAddress(checked);

//     if (checked) {
//       setFormData((prevData) => {
//         const updatedData = { ...prevData };
//         fields.forEach((field) => {
//           updatedData[`current_${field.name}`] = prevData[field.name];
//         });
//         return updatedData;
//       });
//     } else {
//       setFormData((prevData) => {
//         const updatedData = { ...prevData };
//         fields.forEach((field) => {
//           updatedData[`current_${field.name}`] = '';
//         });
//         return updatedData;
//       });
//     }
//   };

//   const handleAddAddressClick = () => {
//     setShowCurrentAddressForm(true);
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//         {fields.map((field, index) => (
//           <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
//             {field.type === "select" ? (
//               <TextField
//                 select
//                 name={field.name}
//                 value={formData[field.name] || ''}
//                 onChange={(event) => setFormData((prevData) => ({ ...prevData, [field.name]: event.target.value }))}
//                 label={field.label}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//               >
//                 <MenuItem value="owned">Owned</MenuItem>
//                 <MenuItem value="rented">Rented</MenuItem>
//               </TextField>
//             ) : field.type === "file" ? (
//               <TextField
//                 type={field.type}
//                 name={field.name}
//                 onChange={handleFileChange}
//                 label={field.label}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{ inputProps: { accept: "image/*, .pdf" }, ref: fileInputRef }}
//               />
//             ) : (
//               <TextField
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name] || ''}
//                 onChange={(event) => setFormData((prevData) => ({ ...prevData, [field.name]: event.target.value }))}
//                 label={field.label}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {!showCurrentAddressForm && (
//         <Button variant="contained" color="primary" onClick={handleAddAddressClick}>
//           Add Current Address
//         </Button>
//       )}

//       {showCurrentAddressForm && (
//         <div style={{ marginTop: '16px' }}>
//           <FormControlLabel
//             control={<Checkbox checked={isSameAddress} onChange={handleCheckboxChange} />}
//             label="Same as permanent address"
//           />
//           <h3>Current Address</h3>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//             {fields.map((field, index) => (
//               <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
//                 {field.type === "select" ? (
//                   <TextField
//                     select
//                     name={`current_${field.name}`}
//                     value={formData[`current_${field.name}`] || ''}
//                     onChange={(event) => setFormData((prevData) => ({ ...prevData, [`current_${field.name}`]: event.target.value }))}
//                     label={field.label}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                   >
//                     <MenuItem value="owned">Owned</MenuItem>
//                     <MenuItem value="rented">Rented</MenuItem>
//                   </TextField>
//                 ) : field.type === "file" ? (
//                   <TextField
//                     type={field.type}
//                     name={`current_${field.name}`}
//                     onChange={handleFileChange}
//                     label={field.label}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                     InputProps={{ inputProps: { accept: "image/*, .pdf" }, ref: fileInputRef }}
//                   />
//                 ) : (
//                   <TextField
//                     type={field.type}
//                     name={`current_${field.name}`}
//                     value={formData[`current_${field.name}`] || ''}
//                     onChange={(event) => setFormData((prevData) => ({ ...prevData, [`current_${field.name}`]: event.target.value }))}
//                     label={field.label}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PermanentAddress;

"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import { _getAll, _get, _getById } from "../../../../utils/apiUtils";
import { useSearchParams } from "next/navigation";

const fields = [
  
  { name: "country_id", label: "Country ", type: "text" },
  { name: "state_id", label: "State ", type: "text" },
  { name: "district_id", label: "District ", type: "text" },
  { name: "city_id", label: "City ", type: "text" },
  { name: "postal_id", label: "Zip/Postal Code ", type: "text" },
  { name: "house_type", label: "House Type", type: "select" },
  
 
  { name: "stay_from_date", label: "Stay From Date", type: "date" },
  { name: "stay_till_date", label: "Stay Till Date", type: "date" },
  { name: "full_address", label: "Full Address", type: "text" },
  { name: "address_proof_file", label: "Address Proof File", type: "file" },
  
];

const PermanentAddress = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [showCurrentAddressForm, setShowCurrentAddressForm] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState({});
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let addressData = await _getById(`/candidate-address`, id);
          addressData = addressData.length > 0 ? addressData[0] : {};
          setPermanentAddress(addressData);

          console.log("addressData", addressData);
          // Populate form data with fetched data
          setFormData(addressData); // Assuming it's an array with single object
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = async (event) => {
    const { name, files } = event.target;

    if (files && files[0]) {
      try {
        const file = files[0];
        const fileBlob = await fileToBlob(file);
        console.log("Address Blob:", fileBlob);
        setFormData((prevData) => ({
          ...prevData,
          [name]: fileBlob,
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
        const result = reader.result;
        console.log("File read result:", result);
        resolve(result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsSameAddress(checked);

    if (checked) {
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        fields.forEach((field) => {
          updatedData[`current_${field.name}`] = prevData[field.name];
        });
        return updatedData;
      });
    } else {
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        fields.forEach((field) => {
          updatedData[`current_${field.name}`] = "";
        });
        return updatedData;
      });
    }
  };

  const handleAddAddressClick = () => {
    setShowCurrentAddressForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {fields.map((field, index) => (
          <div
            key={index}
            style={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}
          >
            {field.type === "select" ? (
              <TextField
                select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    [field.name]: event.target.value,
                  }))
                }
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="owned">Owned</MenuItem>
                <MenuItem value="rented">Rented</MenuItem>
              </TextField>
            ) : field.type === "file" ? (
              <TextField
                type={field.type}
                name={field.name}
                onChange={handleFileChange}
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { accept: "image/*, .pdf" },
                  ref: fileInputRef,
                }}
              />
            ) : (
              <TextField
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    [field.name]: event.target.value,
                  }))
                }
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAddressClick}
        >
          Add Current Address
        </Button>
      )}

      {showCurrentAddressForm && (
        <div style={{ marginTop: "16px" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSameAddress}
                onChange={handleCheckboxChange}
              />
            }
            label="Same as permanent address"
          />
          <h3>Current Address</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {fields.map((field, index) => (
              <div
                key={index}
                style={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}
              >
                {field.type === "select" ? (
                  <TextField
                    select
                    name={`current_${field.name}`}
                    value={formData[`current_${field.name}`] || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        [`current_${field.name}`]: event.target.value,
                      }))
                    }
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="owned">Owned</MenuItem>
                    <MenuItem value="rented">Rented</MenuItem>
                  </TextField>
                ) : field.type === "file" ? (
                  <TextField
                    type={field.type}
                    name={`current_${field.name}`}
                    onChange={handleFileChange}
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      inputProps: { accept: "image/*, .pdf" },
                      ref: fileInputRef,
                    }}
                  />
                ) : (
                  <TextField
                    type={field.type}
                    name={`current_${field.name}`}
                    value={formData[`current_${field.name}`] || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        [`current_${field.name}`]: event.target.value,
                      }))
                    }
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
