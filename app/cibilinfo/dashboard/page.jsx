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

const initialCibilRows = [
  {
    id: 1,
    candidate_id: "C001",
    name: "John Doe",
    father_name: "Michael Doe",
    dob: "1990-01-01",
    pan_number: "ABCDE1234F",
    pan_card: "pan_card1.pdf",
    cibil_score: "750",
    cibil_report: "cibil_report1.pdf",
    aadhar_number: "1234 5678 9012",
    aadhar_card: "aadhar_card1.pdf",
    status: 'Unverified'
  },
  {
    id: 2,
    candidate_id: "C002",
    name: "Jane Smith",
    father_name: "Robert Smith",
    dob: "1985-05-15",
    pan_number: "XYZAB5678G",
    pan_card: "pan_card2.pdf",
    cibil_score: "680",
    cibil_report: "cibil_report2.pdf",
    aadhar_number: "3456 7890 1234",
    aadhar_card: "aadhar_card2.pdf",
    status: 'Unverified'
  },
  // Add more rows as needed
];

const CibilInfoDashboard = () => {
  const [rows, setRows] = useState(initialCibilRows);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
    { field: 'pan_number', headerName: 'PAN Number', width: 150 },
    {
      field: 'pan_card',
      headerName: 'PAN Card',
      width: 200,
      renderCell: (params) => (
        <a href={`/${params.value}`} target="_blank" rel="noopener noreferrer">View</a>
      )
    },
    { field: 'cibil_score', headerName: 'CIBIL Score', width: 150 },
    {
      field: 'cibil_report',
      headerName: 'CIBIL Report',
      width: 200,
      renderCell: (params) => (
        <a href={`/${params.value}`} target="_blank" rel="noopener noreferrer">View</a>
      )
    },
    { field: 'aadhar_number', headerName: 'Aadhar Number', width: 200 },
    {
      field: 'aadhar_card',
      headerName: 'Aadhar Card',
      width: 200,
      renderCell: (params) => (
        <a href={`/${params.value}`} target="_blank" rel="noopener noreferrer">View</a>
      )
    },
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
        CIBIL Information Dashboard
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
          filename={"cibil_data.csv"}
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

export default CibilInfoDashboard;
