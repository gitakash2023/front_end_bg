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
import Education from "./Education";
import CIBILInformation from "./CIBILInformation";
import OtherReferenceInformation from "./OtherReferenceInformation";
import WorkExperience from "./WorkExperience";
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

  const fetchStepData = async (candidateId, step) => {
    if (candidateId && step >= 0 && step < stepEndpoints.length) {
      try {
        setIsLoading(true);
        console.log(`Fetching data for step ${step} with candidateId ${candidateId}`);
        let data = await _getById(stepEndpoints[step], candidateId);
        console.log(`Data fetched for step ${step}:`, data);
        data = data || (Array.isArray(data) ? [] : {});
        setStepData(data);
      } catch (error) {
        console.error(`Failed to fetch data for step ${step}`, error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    let newlyCreatedCandidateId = null;
  
    try {
      // Check if we need to create or update data
      if (Array.isArray(stepData)) {
        for (let item of stepData) {
          if (item.id) {
            console.log(`Updating data for step ${activeStep}`);
            await _update(stepEndpoints[activeStep], item.id, item);
          } else {
            console.log(`Creating new data for step ${activeStep}`);
            const createdData = await _create(stepEndpoints[activeStep], item);
            console.log(`Data created:`, createdData);
            if (activeStep === 0) {
              setCandidateId(createdData.id);
              newlyCreatedCandidateId = createdData.id;
            }
            if(activeStep === 0 && createdData.isError){
              setDialogMessage(createdData.msg || "Failed to save data. Please try again.");
              setSuccess(false);
              setDialogOpen(true);
              return;
            }
          }
        }
      } else {
        if (stepData.id) {
          console.log(`Updating data for step ${activeStep}`);
          await _update(stepEndpoints[activeStep], stepData.id, stepData);
        } else {
          console.log(`Creating new data for step ${activeStep}`);
          const createdData = await _create(stepEndpoints[activeStep], stepData);
          console.log(`Data created:`, createdData);
          if (activeStep === 0) {
            setCandidateId(createdData.id);
            newlyCreatedCandidateId = createdData.id;
          }
          if(activeStep === 0 && createdData.isError){
            setDialogMessage(createdData.msg || "Failed to save data. Please try again.");
            setSuccess(false);
            setDialogOpen(true);
            return;
          }
        }
      }
      // Reset data and move to the next step
      setStepData([]);
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (nextStep < steps.length) {
        fetchStepData(newlyCreatedCandidateId || candidateId, nextStep);
      } else {
        setDialogMessage("All steps completed successfully!");
        setSuccess(true);
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Failed to save data", error);
      setDialogMessage("Failed to save data. Please try again.");
      setSuccess(false);
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
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
      console.error("Failed to go back", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    // if (success) {
    //   router.push("/admin/candidates");
    // }
  };

  const handleGoToLastStep = () => {
    const lastStep = steps.length - 1;
    setActiveStep(lastStep);
    router.push(`/admin/candidates/add-candidates?id=${candidateId}&step=${lastStep}`);
    fetchStepData(candidateId, lastStep);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInformation formData={stepData} setFormData={setStepData} />;
      case 1:
        return <AddressContainer formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 2:
        return <Education formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 3:
        return <CIBILInformation formData={stepData} setFormData={setStepData} />;
      case 4:
        return <WorkExperience formData={stepData} setFormData={setStepData} candidate_id={candidateId} />;
      case 5:
        return <OtherReferenceInformation formData={stepData} setFormData={setStepData} />;
      default:
        return "Unknown step";
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
