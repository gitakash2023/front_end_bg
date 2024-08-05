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

const initialAddressRows = [
  {
    id: 1,
    candidate_id: "C001",
    name: "John Doe",
    father_name: "Michael Doe",
    dob: "1990-01-01",
    address_type: "Current",
    country_id: "India",
    state_id: "Delhi",
    district_id: "New Delhi",
    city_id: "New Delhi",
    postal_id: "110001",
    house_type: "Owned",
    stay_from_date: "2021-01-01",
    stay_till_date: "2023-01-01",
    full_address: "123 Main Street, New Delhi",
    address_proof_file_name: "current_address_proof.pdf",
    status: 'Unverified',
  },
  {
    id: 2,
    candidate_id: "C002",
    name: "Jane Smith",
    father_name: "Robert Smith",
    dob: "1985-05-15",
    address_type: "Permanent",
    country_id: "India",
    state_id: "Maharashtra",
    district_id: "Mumbai",
    city_id: "Mumbai",
    postal_id: "400001",
    house_type: "Rented",
    stay_from_date: "2019-01-01",
    stay_till_date: "2021-12-31",
    full_address: "456 Another Street, Mumbai",
    address_proof_file_name: "permanent_address_proof.docx",
    status: 'Unverified',
  },
  {
    id: 3,
    candidate_id: "C003",
    name: "Alice Johnson",
    father_name: "James Johnson",
    dob: "1992-07-22",
    address_type: "Previous",
    country_id: "India",
    state_id: "Karnataka",
    district_id: "Bangalore",
    city_id: "Bangalore",
    postal_id: "560001",
    house_type: "Owned",
    stay_from_date: "2015-01-01",
    stay_till_date: "2019-12-31",
    full_address: "789 Old Street, Bangalore",
    address_proof_file_name: "previous_address_proof.pdf",
    status: 'Unverified',
  }
  // Add more rows as needed
];

const AddressInfoDashboard = () => {
  const [rows, setRows] = useState(initialAddressRows);
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
    { field: 'address_type', headerName: 'Address Type', width: 150 },
    { field: 'country_id', headerName: 'Country', width: 150 },
    { field: 'state_id', headerName: 'State', width: 150 },
    { field: 'district_id', headerName: 'District', width: 150 },
    { field: 'city_id', headerName: 'City', width: 150 },
    { field: 'postal_id', headerName: 'Postal Code', width: 150 },
    { field: 'house_type', headerName: 'House Type', width: 150 },
    { field: 'stay_from_date', headerName: 'Stay From Date', width: 180 },
    { field: 'stay_till_date', headerName: 'Stay Till Date', width: 180 },
    { field: 'full_address', headerName: 'Full Address', width: 250 },
    { field: 'address_proof_file_name', headerName: 'Uploaded File', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
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
        Address Information Dashboard
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
          filename={"address_data.csv"}
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

export default AddressInfoDashboard;
