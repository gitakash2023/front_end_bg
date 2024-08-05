"use client";
import React, { useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Box, Typography, Paper, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { CSVLink } from 'react-csv';

// Initial dummy data based on the provided fields
const initialRows = [
  { id: 1, name: "John Doe", gender: "Male", dob: "1990-01-01", father_name: "Michael Doe", mobile_no: "1234567890", email_id: "john.doe@example.com", status: 'Unverified' },
  { id: 2, name: "Jane Smith", gender: "Female", dob: "1985-05-15", father_name: "Robert Smith", mobile_no: "0987654321", email_id: "jane.smith@example.com", status: 'Unverified' },
  { id: 3, name: "Alice Johnson", gender: "Female", dob: "1992-11-22", father_name: "William Johnson", mobile_no: "4567891230", email_id: "alice.johnson@example.com", status: 'Unverified' },
  { id: 4, name: "Bob Brown", gender: "Male", dob: "1988-07-30", father_name: "George Brown", mobile_no: "3216549870", email_id: "bob.brown@example.com", status: 'Unverified' },
  { id: 5, name: "Charlie Davis", gender: "Other", dob: "1995-03-18", father_name: "Paul Davis", mobile_no: "7894561230", email_id: "charlie.davis@example.com", status: 'Unverified' },
];

const GenInfoDashboard = () => {
  const [rows, setRows] = useState(initialRows);
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

  const filteredRows = rows.filter(row => {
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           row.email_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    { field: 'name', headerName: 'Candidate Name', width: 200 },
    { field: 'gender', headerName: 'Candidate Gender', width: 200 },
    { field: 'dob', headerName: 'Candidate DOB', width: 200 },
    { field: 'father_name', headerName: "Father's Name", width: 250 },
    { field: 'mobile_no', headerName: 'Mobile No', width: 200 },
    { field: 'email_id', headerName: 'Email ID', width: 250 },
    { field: 'status', headerName: 'Final Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={(event) => handleAction(event, params.row.id)}
        >
          {params.row.status === 'Unverified' ? 'Verify' : 'Unverify'}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        General Information Dashboard
      </Typography>

      <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
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
          data={filteredRows}
          headers={columns.map((col) => ({ label: col.headerName, key: col.field }))}
          filename={"gen_info_data.csv"}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained" color="secondary">
            Export CSV
          </Button>
        </CSVLink>
      </Paper>

      <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #ddd' }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Paper>
    </Box>
  );
};

export default GenInfoDashboard;
