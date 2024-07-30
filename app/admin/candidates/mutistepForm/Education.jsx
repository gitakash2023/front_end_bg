"use client";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, FormHelperText, Button } from "@mui/material";
import DateFormate from "../../../../common-components/DateFormate";

const educationFields = [
  { name: "course_name", label: "Course Name", type: "text" },
  
 
  { name: "university_name", label: "College/University Name", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "duration_start", label: "Start Year", type: "date" },
  { name: "duration_end", label: "End Year", type: "date" },
  { name: "passing_year", label: "Passing Year", type: "date" },
  { name: "gpa_percentage", label: "GPA/Percentage", type: "text" },
  { name: "roll_number", label: "Roll Number", type: "text" },
  { name: "certificate_number", label: " Education Certificate Number", type: "text" },
  { name: "certificate", label: "Upload  Certificate", type: "file" },
];

const EducationForm = ({ education, onChange, index, heading }) => {
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    if (education.certificate) {
      onChange(index, { ...education, certificate_name: education.certificate.name || "Uploaded file" });
    }
  }, [education.certificate, index, onChange]);

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
        onChange(index, { ...education, [name]: blob, certificate_name: file.name });
      };
    } else {
      onChange(index, { ...education, [name]: value });
    }
  };

  return (
    <div className="my-5">
      <h2>{heading} Education</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {educationFields.map((field, idx) => (
          <div key={idx} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
            {field.type === "select" ? (
              <TextField
                select
                name={field.name}
                value={education[field.name] || ''}
                onChange={handleChange}
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : field.type === "date" ? (
              <DateFormate
                name={field.name}
                label={field.label}
                value={education[field.name]}
                onChange={handleChange}
              />
            ) : field.type === "file" ? (
              <div>
                {education.certificate_name && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Uploaded file:</strong> {education.certificate_name}
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
                value={education[field.name] || ''}
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

const Education = ({ formData, setFormData, candidate_id }) => {
  useEffect(() => {
    if (formData.length === 0) {
      setFormData([
        {
          course_name: '',
          highest_qualify: '',
          university_name: '',
          country: '',
          state: '',
          city: '',
          duration_start: '',
          duration_end: '',
          passing_year: '',
          gpa_percentage: '',
          roll_number: '',
          certificate_number: '',
          certificate: null,
          certificate_name: '',
          education_type: "current",
          candidate_id
        },
        {
          course_name: '',
          highest_qualify: '',
          university_name: '',
          country: '',
          state: '',
          city: '',
          duration_start: '',
          duration_end: '',
          passing_year: '',
          gpa_percentage: '',
          roll_number: '',
          certificate_number: '',
          certificate: null,
          certificate_name: '',
          education_type: "previous",
          candidate_id
        },
        {
          course_name: '',
          highest_qualify: '',
          university_name: '',
          country: '',
          state: '',
          city: '',
          duration_start: '',
          duration_end: '',
          passing_year: '',
          gpa_percentage: '',
          roll_number: '',
          certificate_number: '',
          certificate: null,
          certificate_name: '',
          education_type: "other",
          candidate_id
        }
      ]);
    }
  }, [formData, setFormData, candidate_id]);

  const handleEducationChange = (index, updatedEducation) => {
    setFormData(formData.map((education, idx) => (idx === index ? updatedEducation : education)));
  };

  return (
    <div>
      {formData.map((education, index) => (
        <EducationForm
          key={index}
          education={education}
          onChange={handleEducationChange}
          index={index}
          heading={education.education_type}
        />
      ))}
    </div>
  );
};

export default Education;
