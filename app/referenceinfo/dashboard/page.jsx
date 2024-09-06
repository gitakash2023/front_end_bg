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
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

import { _getAll } from '../../../utils/apiUtils'; // Adjust the import path as needed

const ReferenceInfo = () => {
  const [rows, setRows] = useState([]);
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
          dob: item.dob, // Assume `dob` is provided directly in the response
          fatherName: item.father_name, // Assume `father_name` is provided directly in the response
          ref_name: item.CandidteReferences ? item.CandidteReferences.map(ref => ref.ref_name) : [],
          ref_designation: item.CandidteReferences ? item.CandidteReferences.map(ref => ref.ref_designation) : [],
          ref_contact_num: item.CandidteReferences ? item.CandidteReferences.map(ref => ref.ref_contact_num) : [],
          ref_email: item.CandidteReferences ? item.CandidteReferences.map(ref => ref.ref_email) : [],
          status: item.status || 'Unverified',
        }));

        setRows(data);
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
    setSearchQuery(event.target.value);
  };

  const handleAction = useCallback((event, id) => {
    event.stopPropagation();
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
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'fatherName', headerName: 'Father Name', width: 150 },
    { field: 'ref_name', headerName: 'Ref Name', width: 200 },
    { field: 'ref_designation', headerName: 'Ref Designation', width: 200 },
    { field: 'ref_contact_num', headerName: 'Ref Phone Number', width: 150 },
    { field: 'ref_email', headerName: 'Ref Email', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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
        Reference Information Dashboard
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
          filename={"reference_data.csv"}
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
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      )}
    </Box>
  );
};

export default ReferenceInfo;
