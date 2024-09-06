"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { CSVLink } from 'react-csv';
import { Box, Typography, Paper } from '@mui/material';
import { _getAll } from '../../../utils/apiUtils'; // Corrected import

const AddressInfoDashboard = () => {
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await _getAll("/candidate");
        console.log("response", response);
    
        const data = response.map((item) => ({
          candidate_id: item.user_id,
          name: item.name,
          father_name: item.father_name,
          dob: item.dob ? item.dob.split('T')[0] : '', // Check for null/undefined
          id: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.id) : [],
          address_type: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.address_type) : [],
          country_id: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.country_id) : [],
          state_id: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.state_id) : [],
          district_id: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.district_id) : [],
          city_id: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.city_id) : [],
          postal_id: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.postal_id) : [],
          house_type: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.house_type) : [],
          stay_from_date: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.stay_from_date ? addr.stay_from_date.split('T')[0] : '') : [],
          stay_till_date: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.stay_till_date ? addr.stay_till_date.split('T')[0] : '') : [],
          full_address: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.full_address) : [],
          address_proof_file_name: item.CandidteAddresses ? item.CandidteAddresses.map(addr => addr.address_proof_file) : [],
          status: 'Unverified',
        }));
    
        console.log(data);
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);

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
          data={filteredRows}
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
