"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../../common-components/Header";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Box, Paper, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress } from '@mui/material';
import { CSVLink } from "react-csv";
import { _getAll } from '../../../utils/apiUtils'; // Adjust the import path as needed

// Sample user data
const loggedInUser = {
  username: 'Wipro',
  email: 'wipro@gmail.com'
};

const columns = [
  { field: 'name', headerName: 'Candidate Name', width: 200 },
  { field: 'father_name', headerName: 'Father\'s Name', width: 200 },
  { field: 'dob', headerName: 'Date of Birth', width: 150 },
  { field: 'mobile_no', headerName: 'Mobile Number', width: 150 },
  { field: 'aadhar_number', headerName: 'Aadhaar Number', width: 180 },
  { field: 'generalInfo', headerName: 'General Info', width: 150 },
  { field: 'education', headerName: 'Education Info', width: 150 },
  { field: 'address', headerName: 'Address Info', width: 150 },
  { field: 'cibil', headerName: 'CIBIL Info', width: 150 },
  { field: 'experience', headerName: 'Experience Info', width: 150 }
];

const CompanyDashboard = () => {
  const [statusData, setStatusData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await _getAll("/candidate"); // Adjust the API endpoint as needed
        console.log("response", response);

        const data = response.map((item) => ({
          id: item.id,
          name: item.name,
          father_name: item.father_name,
          dob: item.dob,
          mobile_no: item.mobile_no,
          aadhar_number: item.CandidteCibils ? item.CandidteCibils.map(adhar => adhar.aadhar_number) : [],

          generalInfo: "verify",
          education: "unverify",
          address: "verify",
          cibil: "unverify",
          experience: "verify",
        }));

        setStatusData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={getFilteredData()}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        )}
      </Box>
    </>
  );
};

export default CompanyDashboard;
