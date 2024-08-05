"use client";
import React, { useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { CSVLink } from 'react-csv';
import { Box, Typography, Paper } from '@mui/material';

const initialEducationRows = [
  {
    id: 1,
    candidate_id: "C001",
    name: "John Doe",
    father_name: "Michael Doe",
    dob: "1990-01-01",
    course_name: "Computer Science",
    university_name: "University of Delhi",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    duration_start: "2010-01-01",
    duration_end: "2014-12-31",
    passing_year: "2014-06-15",
    gpa_percentage: "85%",
    roll_number: "CS12345",
    certificate_number: "CERT001",
    certificate: "certificate1.pdf",
    status: 'Unverified'
  },
  {
    id: 2,
    candidate_id: "C002",
    name: "Jane Smith",
    father_name: "Robert Smith",
    dob: "1985-05-15",
    course_name: "Mechanical Engineering",
    university_name: "IIT Bombay",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    duration_start: "2011-01-01",
    duration_end: "2015-12-31",
    passing_year: "2015-06-15",
    gpa_percentage: "90%",
    roll_number: "ME67890",
    certificate_number: "CERT002",
    certificate: "certificate2.pdf",
    status: 'Unverified'
  },
  // Add more rows as needed
];

const EducationInfoDashboard = () => {
  const [rows, setRows] = useState(initialEducationRows);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAction = useCallback((event, id) => {
    event.stopPropagation(); // Stop the row from being selected
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'Unverified' ? 'Verified' : 'Unverified' }
          : row
      )
    );
  }, []);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter rows based on status and search query
  const filteredRows = rows.filter((row) => {
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    const matchesSearch = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesStatus && matchesSearch;
  });

  const columns = [
    { field: 'candidate_id', headerName: 'Candidate ID', width: 150 },
    { field: 'name', headerName: 'Candidate Name', width: 200 },
    { field: 'father_name', headerName: "Father's Name", width: 200 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'course_name', headerName: 'Course Name', width: 200 },
    { field: 'university_name', headerName: 'College/University Name', width: 250 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'duration_start', headerName: 'Start Year', width: 150 },
    { field: 'duration_end', headerName: 'End Year', width: 150 },
    { field: 'passing_year', headerName: 'Passing Year', width: 150 },
    { field: 'gpa_percentage', headerName: 'GPA/Percentage', width: 150 },
    { field: 'roll_number', headerName: 'Roll Number', width: 150 },
    { field: 'certificate_number', headerName: 'Certificate Number', width: 200 },
    { field: 'certificate', headerName: 'Certificate', width: 200 },
    { field: 'status', headerName: 'Final Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(event) => handleAction(event, params.row.id)}
        >
          {params.row.status === 'Unverified' ? 'Verify' : 'Unverify'}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Education Information Dashboard
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
            <MenuItem value="Unverified">Unverified</MenuItem>
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
          data={rows}
          headers={columns.map((col) => ({ label: col.headerName, key: col.field }))}
          filename={"education_data.csv"}
        >
          <Button variant="contained" color="secondary">Export CSV</Button>
        </CSVLink>
      </Paper>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default EducationInfoDashboard;
