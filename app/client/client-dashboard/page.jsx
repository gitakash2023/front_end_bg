"use client"
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function CompanyDashboard() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="welcome-dialog-title"
        aria-describedby="welcome-dialog-description"
      >
        <DialogTitle id="welcome-dialog-title">Welcome to the Company Dashboard</DialogTitle>
        <DialogContent>
          <DialogContentText id="welcome-dialog-description">
            Welcome to the Company Dashboard! Here you can manage your company details, view reports, and more. If you need any assistance, feel free to reach out to our support team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div> This is the Company Dashboard page. Welcome to this Dashboard.</div>
    </div>
  );
}

export default CompanyDashboard;
