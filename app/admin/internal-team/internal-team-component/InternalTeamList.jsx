import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import SearchComponent from '@/common-components/SearchComponent';
import { _delete } from '@/utils/apiUtils';
import staticColumns from './columns';

export default function InternalTeamList({ teamListData, onEdit, updateTeamList }) {
    const [filteredTeamListData, setFilteredTeamListData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogVisibility, setDialogVisibility] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setFilteredTeamListData(teamListData);
    }, [teamListData]);

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
        setDialogVisibility({ isErrorDialogOpen: true });
    };

    const handleActionInitiation = (action, team) => {
        setSelectedTeam(team);
        switch (action) {
            case 'edit':
                onEdit(team);
                break;
            case 'delete':
                setDialogVisibility({ isDeleteDialogOpen: true });
                break;
            case 'preview':
                setDialogVisibility({ isPreviewDialogOpen: true });
                break;
            default:
                break;
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        filterData(event.target.value);
    };

    const filterData = (query) => {
        const filteredData = teamListData.filter(team =>
            Object.values(team).some(value =>
                value !== null && value !== undefined && value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredTeamListData(filteredData);
    };

    const confirmDelete = async () => {
        try {
            await _delete('client', selectedTeam.id);
            await updateTeamList(); 
            setDialogVisibility({ isDeleteDialogOpen: false });
        } catch (error) {
            handleErrorMessage('Failed to delete team. Please try again later.');
        }
    };

    const handleCloseDialog = () => {
        setDialogVisibility({});
    };

    return (
        <div style={{ height: 440, width: '100%', padding: '16px' }}>
            <SearchComponent searchQuery={searchQuery} onSearch={handleSearch} />
            <DataGrid
                rows={filteredTeamListData}
                columns={[...staticColumns, {
                    field: 'actions',
                    headerName: 'Actions',
                    width: 200,
                    renderCell: (params) => (
                        <>
                            <IconButton aria-label="edit" color="primary" onClick={() => handleActionInitiation('edit', params.row)}>
                                <Edit />
                            </IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={() => handleActionInitiation('delete', params.row)}>
                                <Delete />
                            </IconButton>
                            <IconButton aria-label="preview" color="default" onClick={() => handleActionInitiation('preview', params.row)}>
                                <Preview />
                            </IconButton>
                        </>
                    ),
                }]}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
            />

            {/* Delete Team */}
            <Dialog open={dialogVisibility.isDeleteDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Delete Team</DialogTitle>
                <DialogContent>Are you sure you want to delete this team?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Preview Team */}
            <Dialog open={dialogVisibility.isPreviewDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Preview Team</DialogTitle>
                <DialogContent>
                    <pre>{JSON.stringify(selectedTeam, null, 2)}</pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Error Dialog */}
            <Dialog open={dialogVisibility.isErrorDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>{errorMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
