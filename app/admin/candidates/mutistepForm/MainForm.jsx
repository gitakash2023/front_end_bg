"use client"
import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import GeneralInformation from "./GeneralInformation";
import PermanentAddress from "./PermanentAddress";
import Education from "./Education";
import CIBILInformation from "./CIBILInformation";
import OtherReferenceInformation from "./OtherReferenceInformation";
import WorkExperience from "./WorkExperience";
import FathersDocument from "./FathersDocument";
import { _create, _update, _getById } from "../../../../utils/apiUtils";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  "General Information",
  "Permanent Address",
  "Education",
  "CIBIL Information",
  "Candidate Reference",
  "Work Experience",
  "Father's Document"
];

const stepEndpoints = [
  "/candidate",
  "/candidate-address",
  "/candidate-education",
  "/candidate-cibil",
  "/candidate-reference",
  "/candidate-work-experience",
  "/fathers-document"
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidateId = searchParams.get('id');
  const stepParam = searchParams.get('step');

  const [activeStep, setActiveStep] = useState(stepParam ? parseInt(stepParam) : 0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (candidateId) {
      fetchCandidateData(candidateId);
    }
  }, [candidateId]);

  const fetchCandidateData = async (id) => {
    try {
      setIsLoading(true);
      const data = await _getById(`/candidate`, id);
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch candidate data", error);
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (candidateId) {
        await _update(stepEndpoints[activeStep], formData);
        toast.success("Candidate information updated successfully!");
      } else {
        await _create(stepEndpoints[activeStep], formData);
        toast.success("Candidate information saved successfully!");
      }
      setSuccess(true);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to save candidate data", error);
      toast.error("Failed to save candidate data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInformation formData={formData} setFormData={setFormData} />;
      case 1:
        return <PermanentAddress formData={formData} setFormData={setFormData} />;
      case 2:
        return <Education formData={formData} setFormData={setFormData} />;
      case 3:
        return <CIBILInformation formData={formData} setFormData={setFormData} />;
      case 4:
        return <OtherReferenceInformation formData={formData} setFormData={setFormData} />;
      case 5:
        return <WorkExperience formData={formData} setFormData={setFormData} />;
      case 6:
        return <FathersDocument formData={formData} setFormData={setFormData} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSave : handleNext}
              >
                {activeStep === steps.length - 1 ? "Save" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={success ? "success" : "error"}>
          {success ? "Candidate information saved successfully!" : "Failed to save candidate information"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainForm;
