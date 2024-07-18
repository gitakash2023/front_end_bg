import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Education = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fields = [
    { name: "course_name", label: "Course Name", type: "text" },
    {
      name: "heighest_qualify",
      label: "Highest Qualification",
      type: "select",
      options: [
        { label: "12th", value: "12th" },
        { label: "Graduation", value: "Graduation" },
        { label: "Master's", value: "Master's" },
        { label: "PhD", value: "PhD" },
        { label: "Other", value: "Other" },
      ],
      required: true,
    },
    
    { name: "university_name", label: "College/University Name", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "duration_start", label: "Start Year", type: "date" },
    { name: "duration_end", label: "End Year", type: "date" },
    { name: "gpa_percentage", label: "GPA/Percentage", type: "text" },
    { name: "passing_year", label: "Passing Year", type: "date" },
    { name: "roll_number", label: "Roll Number", type: "text" },
   
    { name: "certificate_number", label: " Highest Certificate Number", type: "text" },
    { name: "certificate", label: "Upload Highest Certificate", type: "file" },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
          {field.type === 'select' ? (
            <TextField
              select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              required={field.required}
            >
              {field.options.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : field.type === 'file' ? (
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
              InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Education;
