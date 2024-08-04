"use client";
import React, { useState } from 'react';
import Header from "../../../common-components/Header";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Box, ButtonGroup, Container, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SearchComponent from "../../../common-components/SearchComponent";
import { CSVLink } from "react-csv";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Register the plugin with Chart.js
Chart.register(ChartDataLabels);

const loggedInUser = {
  username: 'Wipro',
  email: 'wipro@gmail.com'
};

const statusData = [
  { id: 1, name: 'John Doe', fatherName: 'Richard Doe', dob: '1990-01-01', mobileNumber: '1234567890', aadhaarNumber: '1234 5678 9012', generalInfo: 'Verified', education: 'Verified', address: 'Verified', cibil: 'Verified', experience: 'Verified' },
  { id: 2, name: 'Jane Smith', fatherName: 'Robert Smith', dob: '1992-02-02', mobileNumber: '2345678901', aadhaarNumber: '2345 6789 0123', generalInfo: 'In Progress', education: 'Verified', address: 'In Progress', cibil: 'Verified', experience: 'Rejected' },
  { id: 3, name: 'Mark Johnson', fatherName: 'Michael Johnson', dob: '1989-03-03', mobileNumber: '3456789012', aadhaarNumber: '3456 7890 1234', generalInfo: 'Rejected', education: 'Verified', address: 'Verified', cibil: 'In Progress', experience: 'Verified' },
  // Add more candidate data as needed
];

// Function to count occurrences of each status
const countStatus = (status) => {
  return statusData.filter(candidate => candidate.generalInfo === status).length;
};

// Function to get color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Verified':
      return '#4caf50'; // Green
    case 'In Progress':
      return '#ff9800'; // Orange
    case 'Rejected':
      return '#f44336'; // Red
    default:
      return '#9e9e9e'; // Gray
  }
};

// Data for charts
const pieChartData = {
  labels: ['Verified', 'In Progress', 'Rejected'],
  datasets: [
    {
      label: 'Candidate Status',
      data: [
        countStatus('Verified'),
        countStatus('In Progress'),
        countStatus('Rejected')
      ],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
    }
  ]
};

const barChartData = {
  labels: ['Verified', 'In Progress', 'Rejected'],
  datasets: [
    {
      label: 'Candidate Status',
      data: [
        countStatus('Verified'),
        countStatus('In Progress'),
        countStatus('Rejected')
      ],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336']
    }
  ]
};

const columns = [
  { field: 'name', headerName: 'Candidate Name', width: 200 },
  { field: 'fatherName', headerName: 'Father\'s Name', width: 200 },
  { field: 'dob', headerName: 'Date of Birth', width: 150 },
  { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
  { field: 'aadhaarNumber', headerName: 'Aadhaar Number', width: 180 },
  { 
    field: 'generalInfo', 
    headerName: 'General Info', 
    width: 150,
    renderCell: (params) => (
      <span style={{ color: getStatusColor(params.value) }}>
        {params.value}
      </span>
    )
  },
  { 
    field: 'education', 
    headerName: 'Education', 
    width: 150,
    renderCell: (params) => (
      <span style={{ color: getStatusColor(params.value) }}>
        {params.value}
      </span>
    )
  },
  { 
    field: 'address', 
    headerName: 'Address', 
    width: 150,
    renderCell: (params) => (
      <span style={{ color: getStatusColor(params.value) }}>
        {params.value}
      </span>
    )
  },
  { 
    field: 'cibil', 
    headerName: 'CIBIL', 
    width: 150,
    renderCell: (params) => (
      <span style={{ color: getStatusColor(params.value) }}>
        {params.value}
      </span>
    )
  },
  { 
    field: 'experience', 
    headerName: 'Experience', 
    width: 150,
    renderCell: (params) => (
      <span style={{ color: getStatusColor(params.value) }}>
        {params.value}
      </span>
    )
  },
];

const CompanyDashboard = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleStatusChange = (status) => {
    setFilterStatus(status);
    setSnackbarMessage(`Filtered by ${status}`);
    setOpenSnackbar(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setSnackbarMessage(`Search query updated: ${event.target.value}`);
    setOpenSnackbar(true);
  };

  const getFilteredData = () => {
    let filteredData = statusData;

    if (filterStatus !== 'All') {
      filteredData = filteredData.filter(candidate =>
        candidate.generalInfo === filterStatus ||
        candidate.education === filterStatus ||
        candidate.address === filterStatus ||
        candidate.cibil === filterStatus ||
        candidate.experience === filterStatus
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

  // Get the first character of the username for the Avatar
  const avatarChar = loggedInUser.username.charAt(0).toUpperCase();

  const exportData = getFilteredData(); // Data to export

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Candidate Verification Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>{avatarChar}</Avatar>
            <Typography variant="h6">{loggedInUser.username}</Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>{loggedInUser.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <ButtonGroup sx={{ mb: 2 }}>
              <Button variant="contained" sx={{ mx: 1 }} onClick={() => handleStatusChange('All')}>All</Button>
              <Button variant="contained" sx={{ mx: 1 }} onClick={() => handleStatusChange('Verified')}>Verified</Button>
              <Button variant="contained" sx={{ mx: 1 }} onClick={() => handleStatusChange('In Progress')}>In Progress</Button>
              <Button variant="contained" sx={{ mx: 1 }} onClick={() => handleStatusChange('Rejected')}>Rejected</Button>
            </ButtonGroup>
            <Box sx={{ flexGrow: 1 }} />
            <SearchComponent searchQuery={searchQuery} onSearch={handleSearch} />
            <CSVLink
              data={exportData}
              filename={"candidates_data.csv"}
              
              style={{ textDecoration: 'none', marginLeft: '16px' }}
            >
              <Button variant="contained">Export Data</Button>
            </CSVLink>
          </Box>
          <Box sx={{ height: 400, width: '100%', mb: 3 }}>
            <DataGrid 
              rows={getFilteredData()} 
              columns={columns} 
              pageSize={5} 
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Status Distribution"
                  subheader="Pie chart showing candidate status distribution"
                />
                <CardContent sx={{ height: 'auto', minHeight: 300 }}>
                  <Pie data={pieChartData} plugins={[ChartDataLabels]} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Status Overview"
                  subheader="Bar chart showing number of candidates per status"
                />
                <CardContent sx={{ height: 'auto', minHeight: 300 }}>
                  <Bar data={barChartData} plugins={[ChartDataLabels]} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="info">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
};

export default CompanyDashboard;
