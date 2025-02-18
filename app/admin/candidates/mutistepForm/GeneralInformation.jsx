"use client";
import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { _getAll, _getById } from "../../../../utils/apiUtils";
import { useSearchParams } from "next/navigation";
import DateFormate from "../../../../common-components/DateFormate";

export const fields = [
  {
    name: "notify_candidate",
    label: "E-mail Notification to candidate",
    type: "select",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
  },
  {
    name: "notify_client",
    label: "E-mail Notification to client",
    type: "select",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
  },
  {
    name: "notify_admin",
    label: "E-mail Notification to admin",
    type: "select",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
  },
  {
    name: "form_filled_by",
    label: "Form Filled By",
    type: "select",
    options: [
      { label: "Candidate", value: "Candidate" },
      { label: "Data Internal Team", value: "Data Internal Team" },
    ],
  },
  {
    name: "client_id",
    label: "Company (Auto Assign to Client Portal)",
    type: "text",
  },
  {
    name: "process",
    label: "Process (Auto Assign to Client Portal)",
    type: "text",
  },
  { name: "name", label: "Candidate Name", type: "text" },
  {
    name: "gender",
    label: "Candidate Gender",
    type: "select",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
    required: true,
  },
  { name: "dob", label: "Candidate DOB", type: "date" },
  { name: "father_name", label: "Candidate Father's Name", type: "text" },
  { name: "mobile_no", label: "Candidate Mobile No", type: "text" },
  { name: "email_id", label: "Candidate Email ID", type: "email" },
];

const GeneralInformation = ({ formData, setFormData }) => {
  const [companies, setCompanies] = useState([]);
  const [processList, setProcessList] = useState([]);
  const [Role_id, setRole_id] = useState(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    const Role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
    setRole_id(Role);
  }, []);
 
  const isEditable = Role_id === '1';
 

  useEffect(() => {
    const initialFormData = fields.reduce((acc, field) => {
      if (field.type === "select") {
        acc[field.name] = field.options[0].value;
      } else {
        acc[field.name] = "";
      }
      return acc;
    }, {});
    setFormData((prevData) => ({ ...initialFormData, ...prevData }));

    const fetchData = async () => {
      try {
        const companiesData = await _getAll("/client");
        setCompanies(companiesData);

        if (id) {
          const candidateData = await _getById("/candidate", id);
          if (candidateData) {
            const selectedCompany = companiesData.find(
              (company) => company.name === candidateData.client_id
            );
            setFormData((prevData) => ({
              ...prevData,
              ...candidateData,
              client_id: selectedCompany ? selectedCompany.name : "",
            }));
            setProcessList(candidateData.process_list || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, setFormData]);

  const handleCompanyChange = (event, newValue) => {
    if (isEditable) {
      if (newValue) {
        setFormData((prevData) => ({
          ...prevData,
          client_id: newValue.name,
          process: "",
          process_list: newValue.process_list,
        }));
        setProcessList(newValue.process_list);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          client_id: "",
          process: "",
          process_list: [],
        }));
        setProcessList([]);
      }
    }
  };

  const handleProcessChange = (event, newValue) => {
    if (isEditable) {
      setFormData((prevData) => ({
        ...prevData,
        process: newValue,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditable) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {fields.map((field, index) => (
        <div
          key={index}
          style={{ flex: "1 1 calc(25% - 16px)", minWidth: "200px" }}
        >
          {field.name === "client_id" ? (
            <Autocomplete
              value={
                companies.find((company) => company.name === formData.client_id) ||
                null
              }
              onChange={handleCompanyChange}
              options={companies}
              disabled={!isEditable}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="client_id"
                  label="Company"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          ) : field.name === "process" ? (
            <Autocomplete
              value={formData.process || ""}
              onChange={handleProcessChange}
              options={processList}
              disabled={!isEditable}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="process"
                  label="Process"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          ) : field.type === "select" ? (
            <TextField
              select
              name={field.name}
              disabled={!isEditable}
              value={formData[field.name]}
              onChange={handleChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
            >
              {field.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          ) : field.type === "date" ? (
            <DateFormate
              name={field.name}
              label={field.label}
              disabled={!isEditable}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ) : (
            <TextField
              type={field.type}
              name={field.name}
              disabled={!isEditable}
              value={formData[field.name] || ""}
              onChange={handleChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneralInformation;