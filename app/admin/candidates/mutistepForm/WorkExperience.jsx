import React, { useEffect, useState } from 'react';
import { TextField, FormHelperText, MenuItem } from '@mui/material';
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
  const [fileErrors, setFileErrors] = useState({});
  useEffect(() => {
    // If any file fields change, update the parent component
    if (workExperience.salarySlip || workExperience.relievingLetter || workExperience.experienceLetter) {
      onChange(index, { ...workExperience });
    }
  }, [workExperience.salarySlip, workExperience.relievingLetter, workExperience.experienceLetter, index, onChange]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
      const fileName = file.name;
      const fileType = file.type;
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg","application/docx"];
      
      // Validate file type
      if (!allowedTypes.includes(fileType)) {
        setFileErrors(prev => ({ ...prev, [name]: "Unsupported file type" }));
        return;
      }

      setFileErrors(prev => ({ ...prev, [name]: "" }));

      const formData = new FormData();
      formData.append(name, file);

      // Update state with the file and its name
      onChange(index, {
        ...workExperience,
        [`${name}_name`]: fileName,
        [name]: formData.get(name),
      });
    } else {
      // Handle text input changes
      onChange(index, { ...workExperience, [name]: value });
    }
  };

  

  return (
    <div className="my-5">
      <h2>{heading} Work Experience</h2>
      <TextField
        type="hidden"
        name="candidate_id"
        value={workExperience.candidate_id || ''}
      />
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
                {workExperience[field.name] && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Uploaded file:</strong> {workExperience[`${field.name}_name`]}
                    {workExperience[field.name] && (
                      <a  href={`https://bgv-backend.vitsinco.com${workExperience[field.name]}`} target="_blank" rel="noopener noreferrer"> Preview</a>
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

const WorkExperience = ({ formData, setFormData ,candidate_id}) => {
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
  }, [formData, setFormData]);

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
