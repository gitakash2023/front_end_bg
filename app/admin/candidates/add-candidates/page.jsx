import React from 'react';
import MainForm from "../mutistepForm/MainForm";
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';

function AddCandidate() {
  return (
    <div>
      <ToastContainer />
      <Box sx={{ margin: 2 }}>
        <MainForm />
      </Box>
    </div>
  );
}

export default AddCandidate;
