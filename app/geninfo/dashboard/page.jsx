"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Box, Typography, Paper, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { CSVLink } from 'react-csv';
import { _getAll } from '../../../utils/apiUtils'; // Import the API utility function

const GenInfoDashboard = () => {
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await _getAll('/candidate');
        setRows(fetchedData || []); // Ensure it handles empty responses
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
