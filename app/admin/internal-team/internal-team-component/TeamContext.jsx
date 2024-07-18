import React, { useState, useEffect } from 'react';
import { Button, Modal, Grid } from '@mui/material';
import { BsPlus, BsDownload } from 'react-icons/bs';
import InternalTeamList from "./InternalTeamList"
import NewTeamForm from "./NewTeamForm"

import { _getAll } from '@/utils/apiUtils'; 

function TeamContext() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamListData, setTeamListData] = useState([]);

    useEffect(() => {
        updateTeamList(); 
    }, []);

    const handleOpenModal = (team) => {
        setSelectedTeam(team);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTeam(null);
        setIsModalOpen(false);
    };

    const updateTeamList = async () => {
        try {
            const data = await _getAll('/client');
            setTeamListData(data);
        } catch (error) {
            console.error('Failed to fetch team data. Please try again later.', error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div style={{ margin: "10px" }}>
                    {/* Placeholder for additional buttons or elements */}
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ margin: "10px" }}>
                        <Button
                            variant="contained"
                            startIcon={<BsDownload style={{ fontSize: '1.2em' }} />}
                        >
                            Download as Excel
                        </Button>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <Button
                            variant="contained"
                            startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                            onClick={() => handleOpenModal(null)}
                        >
                            New Team
                        </Button>
                    </div>
                </div>
            </div>
            <InternalTeamList 
                teamListData={teamListData}
                onEdit={handleOpenModal} 
                onAdd={handleOpenModal} 
                updateTeamList={updateTeamList} 
            />
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <Grid >
                    <Grid >
                        <NewTeamForm team={selectedTeam} onClose={handleCloseModal} updateTeamList={updateTeamList} />
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}

export default TeamContext;
