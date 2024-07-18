"use client";
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaUser, FaEnvelope, FaMobile } from 'react-icons/fa';
import { _create, _update } from '../../../../utils/apiUtils';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const inputFields = [
    { name: 'name', placeholder: 'Name of Team', label: 'Name', type: 'text', icon: <FaUser /> },
    { name: 'email_id', placeholder: 'Email ID', label: 'Email', type: 'email', icon: <FaEnvelope /> },
    { name: 'mobile_number', placeholder: 'Phone Number', label: 'Phone Number', type: 'text', icon: <FaMobile /> }
];

const NewTeamForm = ({ team, onClose, updateTeamList }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const initialValues = {
        name: team ? team.name : '',
        email_id: team ? team.email_id : '',
        mobile_number: team ? team.mobile_number : ''
    };

    useEffect(() => {
        if (successMessage || errorMessage) {
            setSnackbarOpen(true);
        } else {
            setSnackbarOpen(false);
        }
    }, [successMessage, errorMessage]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (team) {
                await _update('client', team.id, values);
                setSuccessMessage('Team updated successfully!');
            } else {
                await _create('/client', values);
                setSuccessMessage('Team registered successfully!');
            }
            onClose();
            updateTeamList(); 
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to save team data. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: "80vh", width: "80%" }}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={successMessage || errorMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-md-6">
                    <div className="card shadow p-4" style={{ borderRadius: "20px" }}>
                        <h1 className="card-title text-center mb-4" style={{ fontWeight: 'bold', color: 'blue', fontSize: '2rem' }}>
                            {team ? 'Update Team' : 'Register New Team'}
                        </h1>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validate={(values) => {
                                const errors = {};
                                inputFields.forEach(field => {
                                    if (!values[field.name]) {
                                        errors[field.name] = `${field.label} is required`;
                                    } else if (field.name === 'email_id' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_id)) {
                                        errors.email_id = 'Invalid email address';
                                    } else if (field.name === 'mobile_number' && (!/^\d{10}$/i.test(values.mobile_number) || values.mobile_number.length !== 10)) {
                                        errors.mobile_number = 'Phone number must be exactly 10 digits';
                                    }
                                });
                                return errors;
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {inputFields.map((field, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text" style={{ backgroundColor: '#f3f4f6' }}>{field.icon}</span>
                                                <Field
                                                    type={field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    className="form-control"
                                                    style={{ backgroundColor: '#f3f4f6', color: 'black', fontSize: '1rem', border: '1px solid #ced4da', borderRadius: '0.25rem' }}
                                                    maxLength={field.name === 'mobile_number' ? 10 : undefined}
                                                />
                                            </div>
                                            <ErrorMessage name={field.name} component="div" className="error-message" style={{ fontSize: '0.8rem', color: "red", marginLeft: '5px' }} />
                                        </div>
                                    ))}
                                    <div className="text-center d-flex justify-content-center">
                                        <button type="button" className="btn btn-secondary me-2" onClick={onClose} style={{ fontSize: '1rem' }}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ fontSize: '1rem' }}>
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTeamForm;
