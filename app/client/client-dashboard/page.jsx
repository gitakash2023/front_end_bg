"use client";
import React, { useState } from 'react';
import Header from "../../../common-components/Header";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Box, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { CSVLink } from "react-csv";

// Sample user data
const loggedInUser = {
  username: 'Wipro',
  email: 'wipro@gmail.com'
};

// Sample candidate data
const statusData = [
  { id: 1, name: 'John Doe', fatherName: 'Richard Doe', dob: '1990-01-01', mobileNumber: '1234567890', aadhaarNumber: '1234 5678 9012', generalInfo: 'Verified', education: 'Verified', address: 'Verified', cibil: 'Verified', experience: 'Verified' },
  { id: 2, name: 'Jane Smith', fatherName: 'Robert Smith', dob: '1992-02-02', mobileNumber: '2345678901', aadhaarNumber: '2345 6789 0123', generalInfo: 'In Progress', education: 'Verified', address: 'In Progress', cibil: 'Verified', experience: 'Rejected' },
  { id: 3, name: 'Mark Johnson', fatherName: 'Michael Johnson', dob: '1989-03-03', mobileNumber: '3456789012', aadhaarNumber: '3456 7890 1234', generalInfo: 'Rejected', education: 'Verified', address: 'Verified', cibil: 'In Progress', experience: 'Verified' },
  { id: 4, name: 'Emily Davis', fatherName: 'David Davis', dob: '1991-04-04', mobileNumber: '4567890123', aadhaarNumber: '4567 8901 2345', generalInfo: 'Verified', education: 'In Progress', address: 'Verified', cibil: 'Rejected', experience: 'Verified' },
  { id: 5, name: 'Michael Brown', fatherName: 'James Brown', dob: '1985-05-05', mobileNumber: '5678901234', aadhaarNumber: '5678 9012 3456', generalInfo: 'In Progress', education: 'Verified', address: 'In Progress', cibil: 'Verified', experience: 'In Progress' }
];

const columns = [
  { field: 'name', headerName: 'Candidate Name', width: 200 },
  { field: 'fatherName', headerName: 'Father\'s Name', width: 200 },
  { field: 'dob', headerName: 'Date of Birth', width: 150 },
  { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
  { field: 'aadhaarNumber', headerName: 'Aadhaar Number', width: 180 },
  { field: 'generalInfo', headerName: 'General Info', width: 150 },
  { field: 'education', headerName: 'Education', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  { field: 'cibil', headerName: 'CIBIL', width: 150 },
  { field: 'experience', headerName: 'Experience', width: 150 }
];

const CompanyDashboard = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const getFilteredData = () => {
    let filteredData = statusData;

    if (statusFilter !== 'All') {
      filteredData = filteredData.filter(candidate =>
        candidate.generalInfo === statusFilter ||
        candidate.education === statusFilter ||
        candidate.address === statusFilter ||
        candidate.cibil === statusFilter ||
        candidate.experience === statusFilter
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery) ||
        candidate.fatherName.toLowerCase().includes(searchQuery) ||
        candidate.mobileNumber.includes(searchQuery)
      );
    }

    return filteredData;
  };

  const exportData = getFilteredData(); // Data to export

  return (
    <>
      <Header />
      <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
          Candidate Verification Status - Company Dashboard
        </Typography>
        <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Verified">Verified</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flex: 1 }}
          />
          <CSVLink
            data={exportData}
            headers={columns.map((col) => ({ label: col.headerName, key: col.field }))}
            filename={"candidates_data.csv"}
          >
            <Button variant="contained" color="secondary">Export CSV</Button>
          </CSVLink>
        </Paper>
       
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={getFilteredData()}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Box>
    </>
  );
};

export default CompanyDashboard;
