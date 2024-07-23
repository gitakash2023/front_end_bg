"use client";
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
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/common-components/Header";

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
  "/workingExp",
  "/fathers-documen"
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidate_id = searchParams.get("id");
  const stepParam = searchParams.get("step");

  const [candidateId, setCandidateId] = useState(candidate_id);
  const [activeStep, setActiveStep] = useState(stepParam ? parseInt(stepParam) : 0);
  const [formData, setFormData] = useState({});
  const [stepData, setStepData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (candidateId) {
      fetchStepData(candidateId, activeStep);
    }
  }, [activeStep, candidateId]);

  const fetchStepData = async (candidateId, step) => {
    if (candidateId && step >= 0 && step < stepEndpoints.length) {
      try {
        setIsLoading(true);
        let data = await _getById(stepEndpoints[step], candidateId);
        data = data?.length > 0 ? data[0] : {};
        setStepData({ ...data, candidate_id: candidateId });
        setSnackbarMessage(`Data for step ${steps[step]} loaded successfully.`);
        setSuccess(true);
      } catch (error) {
        console.error(`Failed to fetch data for step ${step}`, error);
        setSnackbarMessage(`Failed to fetch data for step ${steps[step]}. Please try again.`);
        setSuccess(false);
      } finally {
        setIsLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      if (stepData.id) {
        await _update(stepEndpoints[activeStep], stepData.id, stepData);
      } else {
        const createdData = await _create(stepEndpoints[activeStep], stepData);
        if (activeStep === 0) {
          setCandidateId(createdData.id);
        }
        setFormData({ ...formData, candidate_id: createdData.id });
        router.push(`/admin/candidates/add-candidates?id=${createdData.id}&step=${activeStep + 1}`);
      }
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      fetchStepData(candidateId, nextStep);
    } catch (error) {
      console.error("Failed to save data", error);
      setSnackbarMessage("Failed to save data. Please try again.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleBack = async () => {
    setIsLoading(true);
    try {
      const previousStep = activeStep - 1;
      setActiveStep(previousStep);
      router.push(`/admin/candidates/add-candidates?id=${candidateId}&step=${previousStep}`);
      fetchStepData(candidateId, previousStep);
    } catch (error) {
      console.error("Failed to save data", error);
      setSnackbarMessage("Failed to save data. Please try again.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (stepData.id) {
        await _update(stepEndpoints[activeStep], stepData.id, stepData);
        setSnackbarMessage("Candidate information updated successfully!");
        setSuccess(true);
      } else {
        const createdData = await _create(stepEndpoints[activeStep], stepData);
        setSnackbarMessage("Candidate information saved successfully!");
        setSuccess(true);
        router.push(`/admin/candidates/add-candidates?id=${createdData.id}&step=${activeStep}`);
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to save candidate data", error);
      setSnackbarMessage("Failed to save candidate data. Please try again.");
      setSuccess(false);
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
        return <GeneralInformation formData={stepData} setFormData={setStepData} />;
      case 1:
        return <PermanentAddress formData={stepData} setFormData={setStepData} />;
      case 2:
        return <Education formData={stepData} setFormData={setStepData} />;
      case 3:
        return <CIBILInformation formData={stepData} setFormData={setStepData} />;
      case 4:
        return <OtherReferenceInformation formData={stepData} setFormData={setStepData} />;
      case 5:
        return <WorkExperience formData={stepData} setFormData={setStepData} />;
      case 6:
        return <FathersDocument formData={stepData} setFormData={setStepData} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <>
    <Header/>
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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSave : handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={success ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
};

export default MainForm;
