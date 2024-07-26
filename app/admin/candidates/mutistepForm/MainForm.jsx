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
];

const stepEndpoints = [
  "/candidate",
  "/candidate-address",
  "/candidate-education",
  "/candidate-cibil",
  "/candidate-reference",
  "/workingExp",
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
        let data = await _getById(stepEndpoints[step], candidateId);
        data = data || [];
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
      if (stepData.id || (Array.isArray(stepData) && stepData?.every(data => data.id))) {
        await _update(stepEndpoints[activeStep], stepData.id || stepData[0].id, stepData);
      } else {
        const createdData = await _create(stepEndpoints[activeStep], stepData);
        if (activeStep === 0) {
          setCandidateId(createdData.id);
          newlyCreatedCandidateId = createdData.id;
        }
        router.push(`/admin/candidates/add-candidates?id=${newlyCreatedCandidateId || candidateId}&step=${activeStep + 1}`);
      }
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
      console.error("Failed to save data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (success) {
      router.push("/admin/candidates");
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInformation formData={stepData} setFormData={setStepData} />;
      case 1:
        return <AddressContainer formData={Array.isArray(stepData) ? stepData : []} setFormData={setStepData}  candidate_id={candidateId}/>;
      case 2:
        return <Education formData={stepData[0]} setFormData={setStepData} />;
      case 3:
        return <CIBILInformation formData={stepData[0]} setFormData={setStepData} />;
      case 4:
        return <OtherReferenceInformation formData={stepData[0]} setFormData={setStepData} />;
      case 5:
        return <WorkExperience formData={stepData[0]} setFormData={setStepData} />;
      case 6:
        return <FathersDocument formData={stepData[0]} setFormData={setStepData} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Header />
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
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default MainForm;