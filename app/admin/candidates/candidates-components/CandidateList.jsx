"use client";

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, CircularProgress } from '@mui/material';
import { Edit, Delete, Preview } from '@mui/icons-material';
import SearchComponent from '@/common-components/SearchComponent';
import { _getAll, _delete } from '@/utils/apiUtils';  
import columns from './columns';
import Link from 'next/link';

export default function CandidateList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [dialogVisibility, setDialogVisibility] = useState({
        isDeleteDialogOpen: false,
        isErrorDialogOpen: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await _getAll('/candidate');
            const formattedData = data.map(item => ({
                id: item.id,
                name: item.name,
                mobile_no: item.mobile_no,
                email_id: item.email_id,
                father_name: item.father_name,
                gender: item.gender,
                dob: item.dob,
                postal_id: item.CandidteAddresses[0]?.postal_id || 'N/A',
                full_address: item.CandidteAddresses[0]?.full_address || 'N/A',
                highest_qualify: item.CandidteEductions[0]?.highest_qualify || 'N/A',
                certificate_number: item.CandidteEductions[0]?.certificate_number || 'N/A',
                pan_number: item.CandidteCibils[0]?.pan_number || 'N/A',
                aadhar_number: item.CandidteCibils[0]?.aadhar_number || 'N/A',
                ref_email: item.CandidteReferences[0]?.ref_email || 'N/A',
                companyName: item.WorkExperiences[0]?.companyName || 'N/A',
                companyEmail: item.WorkExperiences[0]?.companyEmail || 'N/A'
            }));
            setRows(formattedData);
            setFilteredRows(formattedData); 
        } catch (error) {
            console.error('Failed to fetch data', error);
            setErrorMessage('Failed to fetch data. Please try again later.');
            setDialogVisibility((prevState) => ({ ...prevState, isErrorDialogOpen: true }));
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterData(query);
    };

    const filterData = (query) => {
        const filteredData = rows.filter(row =>
            Object.values(row).some(value =>
                value && value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData);
    };

    const handleDeleteInitiation = (row) => {
        setSelectedCandidate(row);
        setDialogVisibility((prevState) => ({ ...prevState, isDeleteDialogOpen: true }));
    };

    const handlePreviewInitiation = (row) => {
        console.log('Preview:', row);
    };

    const confirmDelete = async () => {
        setIsDeleting(true); // Start loading indicator
        try {
            await _delete('/candidate', selectedCandidate.id);
            const updatedData = await _getAll('/candidate'); 
            setRows(updatedData); 
            setFilteredRows(updatedData); 
            setDialogVisibility((prevState) => ({ ...prevState, isDeleteDialogOpen: false }));
            setSnackbarOpen(true);
        } catch (error) {
            setErrorMessage('Failed to delete candidate. Please try again later.');
            setDialogVisibility((prevState) => ({ ...prevState, isErrorDialogOpen: true }));
        } finally {
            setIsDeleting(false); // Stop loading indicator
        }
    };

    const closeDialog = (dialogName) => {
        setDialogVisibility((prevState) => ({ ...prevState, [dialogName]: false }));
    };

    const actionsColumn = {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
            <>
                <Link href={{
                    pathname: "/admin/candidates/add-candidates",
                    query: { id: params.row.id, step: params.row.currentStep }
                }}>
                    <IconButton aria-label="edit" color="primary">
                        <Edit />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" color="secondary" onClick={() => handleDeleteInitiation(params.row)}>
                    <Delete />
                </IconButton>
                <IconButton aria-label="preview" color="default" onClick={() => handlePreviewInitiation(params.row)}>
                    <Preview />
                </IconButton>
            </>
        ),
    };

    const updatedColumns = [...columns, actionsColumn];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <SearchComponent searchQuery={searchQuery} onSearch={handleSearch} />
                </div>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={filteredRows.length > 0 ? filteredRows : rows} columns={updatedColumns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
            </div>

            {/* Delete Candidate Dialog */}
            <Dialog open={dialogVisibility.isDeleteDialogOpen} onClose={() => closeDialog('isDeleteDialogOpen')}>
                <DialogTitle>Delete Candidate</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this candidate?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeDialog('isDeleteDialogOpen')} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Error Dialog */}
            <Dialog open={dialogVisibility.isErrorDialogOpen} onClose={() => closeDialog('isErrorDialogOpen')}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    {errorMessage}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeDialog('isErrorDialogOpen')} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="Candidate deleted successfully"
            />

            {/* Loading Indicator */}
            {isDeleting && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <CircularProgress />
                </div>
            )}
        </>
    );
}
