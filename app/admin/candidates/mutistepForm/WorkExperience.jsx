import React, { useEffect, useState } from 'react';
import { TextField, FormHelperText } from '@mui/material';
import DateFormate from "../../../../common-components/DateFormate";

const workExperienceFields = [
  { name: "companyName", label: "Company Name", type: "text" },
  { name: "companyEmail", label: "Company Email ID", type: "email" },
  { name: "companyLocation", label: "Company Location", type: "text" },
  { name: "employeeId", label: "Employee ID", type: "text" },
  { name: "designation", label: "Designation", type: "text" },
  { name: "from", label: "From", type: "date" },
  { name: "to", label: "To", type: "date" },
  { name: "salary", label: "Salary in CTC(LPA)", type: "text" },
  { name: "salarySlip", label: "Upload Salary Slip", type: "file" },
  { name: "reasonForLeaving", label: "Reason for Leaving", type: "text" },
  { name: "relievingLetter", label: "Upload Relieving Letter", type: "file" },
  { name: "experienceLetter", label: "Upload Experience Letter", type: "file" },
];

const WorkExperienceForm = ({ workExperience, onChange, index, heading }) => {
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    if (workExperience.salarySlip) {
      onChange(index, { ...workExperience, salarySlip_name: workExperience.salarySlip.name || "Uploaded file" });
    }
    if (workExperience.relievingLetter) {
      onChange(index, { ...workExperience, relievingLetter_name: workExperience.relievingLetter.name || "Uploaded file" });
    }
    if (workExperience.experienceLetter) {
      onChange(index, { ...workExperience, experienceLetter_name: workExperience.experienceLetter.name || "Uploaded file" });
    }
  }, [workExperience, index, onChange]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFileError("File size exceeds 5MB.");
        return;
      }
      if (!["application/pdf", "image/png", "image/jpeg"].includes(file.type)) {
        setFileError("Invalid file type. Only PDF, PNG, JPG, JPEG are allowed.");
        return;
      }
      setFileError(null);
      onChange(index, { ...workExperience, [name]: file, [`${name}_name`]: file.name });
    } else {
      onChange(index, { ...workExperience, [name]: value });
    }
  };

  return (
    <div className="my-5">
      <h2>{heading} Work Experience</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {workExperienceFields.map((field, idx) => (
          <div key={idx} style={{ flex: '1 1 calc(50% - 16px)', minWidth: '300px' }}>
            {field.type === "date" ? (
              <DateFormate
                name={field.name}
                label={field.label}
                value={workExperience[field.name]}
                onChange={handleChange}
              />
            ) : field.type === "file" ? (
              <div>
                {workExperience[`${field.name}_name`] && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Uploaded file:</strong> {workExperience[`${field.name}_name`]}
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
                      accept: ".pdf,.png,.jpg,.jpeg"
                    }
                  }}
                />
                {fileError && <FormHelperText error>{fileError}</FormHelperText>}
              </div>
            ) : (
              <TextField
                type={field.type}
                name={field.name}
                value={workExperience[field.name] || ''}
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

const WorkExperience = ({ formData, setFormData, candidate_id }) => {
  useEffect(() => {
    if (formData.length === 0) {
      setFormData([
        {
          candidate_id: candidate_id,
          companyName: '',
          companyEmail: '',
          companyLocation: '',
          employeeId: '',
          designation: '',
          from: '',
          to: '',
          salary: '',
          salarySlip: null,
          salarySlip_name: '',
          reasonForLeaving: '',
          relievingLetter: null,
          relievingLetter_name: '',
          experienceLetter: null,
          experienceLetter_name: '',
          experience_type: "current",
        },
        {
          candidate_id: candidate_id,
          companyName: '',
          companyEmail: '',
          companyLocation: '',
          employeeId: '',
          designation: '',
          from: '',
          to: '',
          salary: '',
          salarySlip: null,
          salarySlip_name: '',
          reasonForLeaving: '',
          relievingLetter: null,
          relievingLetter_name: '',
          experienceLetter: null,
          experienceLetter_name: '',
          experience_type: "previous",
        },
        {
          candidate_id: candidate_id,
          companyName: '',
          companyEmail: '',
          companyLocation: '',
          employeeId: '',
          designation: '',
          from: '',
          to: '',
          salary: '',
          salarySlip: null,
          salarySlip_name: '',
          reasonForLeaving: '',
          relievingLetter: null,
          relievingLetter_name: '',
          experienceLetter: null,
          experienceLetter_name: '',
          experience_type: "other",
        }
      ]);
    }
  }, [formData, setFormData, candidate_id]);

  const handleWorkExperienceChange = (index, updatedWorkExperience) => {
    setFormData(formData.map((workExperience, idx) => (idx === index ? updatedWorkExperience : workExperience)));
  };

  return (
    <div>
      {formData.map((workExperience, index) => (
        <WorkExperienceForm
          key={index}
          workExperience={workExperience}
          onChange={handleWorkExperienceChange}
          index={index}
          heading={workExperience.experience_type}
        />
      ))}
    </div>
  );
};

export default WorkExperience;
