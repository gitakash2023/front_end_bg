"use client";
import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GeneralInformation from "./GeneralInformation";
import AddressContainer from "./PermanentAddress";
import CIBILInformation from "./CIBILInformation";
import OtherReferenceInformation from "./OtherReferenceInformation";
import WorkExperience from "./WorkExperience";
import EducationContainer from "./Education";
import { _create, _update, _getById } from "../../../../utils/apiUtils";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/common-components/Header";
import CustomButton from "@/common-components/CustomButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const steps = [
  "General Information",
  "Permanent Address",
  "Education",
  "CIBIL Information",
  "Work Experience",
  "Candidate Reference",
];

const stepEndpoints = [
  "/candidate",
  "/candidate-address",
  "/candidate-education",
  "/candidate-cibil",
  "/workingExp",
  "/candidate-reference",
];

const MainForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidate_id = searchParams.get("id");
  const stepParam = searchParams.get("step");

  const [candidateId, setCandidateId] = useState(candidate_id);
  const [activeStep, setActiveStep] = useState(stepParam ? parseInt(stepParam) : 0);
  const [stepData, setStepData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    if (candidateId) {
      fetchStepData(candidateId, activeStep);
    }
  }, [activeStep, candidateId]);

  const userRole = localStorage.getItem('userRole');
  console.log("userRole",userRole)

  const fetchStepData = async (candidateId, step) => {
    if (candidateId && step >= 0 && step < stepEndpoints.length) {
      try {
        setIsLoading(true);
        const data = await _getById(stepEndpoints[step], candidateId);
        if (Array.isArray(data)) {
          setStepData(data);
        } else {
          setStepData([data]);
        }
      } catch (error) {
        console.error(`Failed to fetch data for step ${step}`, error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      if (stepData.length > 1) {
        for (let item of stepData) {
          if (item.id) {
            await _update(stepEndpoints[activeStep], item.id, item);
          } else {
            const createdData = await _create(stepEndpoints[activeStep], item);
            if (activeStep === 0) {
              setCandidateId(createdData.id);
            }
          }
        }
      } else if (stepData.length === 1) {
        const item = stepData[0];
        if (item.id) {
          await _update(stepEndpoints[activeStep], item.id, item);
        } else {
          const createdData = await _create(stepEndpoints[activeStep], item);
          if (activeStep === 0) {
            setCandidateId(createdData.id);
          }
        }
      }

      setStepData([]);
      const nextStep = activeStep + 1;
      
      if (nextStep < steps.length) {
        setActiveStep(nextStep);
        router.push(`/admin/candidates/add-candidates?id=${candidateId}&step=${nextStep}`);
        fetchStepData(candidateId, nextStep);
      } else {
        // Ensure success dialog appears
        showDialog("All steps completed successfully!", true);
        setTimeout(() => {
          if (userRole === '1') {
            router.push('/admin/admin-dashboard');
          } else {
            // Add redirection logic for other roles if needed
          }
        }, 2000); // Delay to show the dialog before redirecting
      }
    } catch (error) {
      console.error("Failed to save data", error);
      showDialog("Failed to save data. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const previousStep = activeStep - 1;
    setActiveStep(previousStep);
    router.push(`/admin/candidates/add-candidates?id=${candidateId}&step=${previousStep}`);
    fetchStepData(candidateId, previousStep);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleGoToLastStep = () => {
    const lastStep = steps.length - 1;
    setActiveStep(lastStep);
    router.push(`/admin/candidates/add-candidates?id=${candidateId}&step=${lastStep}`);
    fetchStepData(candidateId, lastStep);
  };

  const showDialog = (message, isSuccess) => {
    setDialogMessage(message);
    setSuccess(isSuccess);
    setDialogOpen(true);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInformation formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 1:
        return <AddressContainer formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 2:
        return <EducationContainer formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 3:
        return <CIBILInformation formData={stepData[0] || {}} setFormData={(data) => setStepData([data])} candidate_id={candidateId} />;
      case 4:
        return <WorkExperience formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 5:
        return <OtherReferenceInformation formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div>
        <CustomButton 
          text="Back" 
          icon={<ArrowBackIcon />} 
          onClick={handleGoToLastStep} 
        />
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
            <>
              {getStepContent(activeStep)}
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{success ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainForm;
