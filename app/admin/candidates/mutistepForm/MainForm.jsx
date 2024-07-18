"use client";

import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import GeneralInformation from "./GeneralInformation";
import PermanentAddress from "./PermanentAddress";
import Education from "./Education";
import CIBILInformation from "./CIBILInformation";
import OtherReferenceInformation from "./OtherReferenceInformation";
import WorkExperience from "./WorkExperience";
import FathersDocument from "./FathersDocument";
import { _create, _getById } from "../../../../utils/apiUtils";
import { toast } from 'react-toastify'; // Import toast
import { useSearchParams } from 'next/navigation';
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

const steps = [
  "General Information",
  "Permanent Address",
  "Education",
  "CIBIL Information",
  "Candidate Reference",
  'Work Experience',
  'Father\'s Document'
];

const stepEndpoints = [
  "/candidate",
  "/candidate-address",
  "/candidate-education",
  "/candidate-cibil",
  "/candidate-reference",
  '/candidate-work-experience',
  '/fathers-document'
];

const MainForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [candidateId, setCandidateId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [success, setSuccess] = useState(false); // State for success message
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setCandidateId(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const candidateData = await _getById("/candidate", id);
          setFormData(candidateData);
          console.log("candidateData", candidateData);
          const isStepOneComplete = isGenInfoComplete(candidateData);
          if (isStepOneComplete) {
            setActiveStep(1);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, setFormData]);

  const handleNext = async () => {
    try {
      setIsLoading(true); // Start loading indicator

      let payload = { ...formData };

      if (activeStep === 0) {
        if (!payload.id) {
          const response = await _create(stepEndpoints[activeStep], payload);
          console.log(response);
          if (response.isError) {
            toast.error(response.msg);
            setIsLoading(false); // Stop loading indicator on error
            return;
          }
          setActiveStep((prevStep) => prevStep + 1);
          const id = response.id;
          console.log("responseId:", id);
          setCandidateId(id);
        } else {
          setActiveStep((prevStep) => prevStep + 1);
        }
      } else {
        payload = {
          ...payload,
          candidate_id: candidateId,
        };

        await _create(stepEndpoints[activeStep], payload);
        setActiveStep((prevStep) => prevStep + 1);
      }

      console.log("Form data submitted successfully for step:", activeStep);
      console.log("Next Step:", activeStep + 1);
    } catch (error) {
      console.error("Failed to submit form data for step:", activeStep, error);
    } finally {
      setIsLoading(false); // Stop loading indicator after form submission
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    console.log("Previous Step:", activeStep - 1);
    // Remove the toast message about email already exists
    toast.dismiss(); // This dismisses any existing toast notifications
  };

  const handleFinalSubmit = async () => {
    try {
      setIsLoading(true); // Start loading indicator

      await _create(stepEndpoints[activeStep], formData);
      console.log("Form data submitted successfully for step:", activeStep);
      toast.success("Form submitted successfully!");
      setSuccess(true); // Set success state to true
    } catch (error) {
      console.error(
        "Failed to submit form data for final step:",
        activeStep,
        error
      );
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading indicator after final submission
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {success ? ( // Show success message if success state is true
        <div>
          <h2>Form submitted successfully!</h2>
        </div>
      ) : (
        <>
          {activeStep === 0 && (
            <GeneralInformation formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 1 && (
            <PermanentAddress formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 2 && (
            <Education formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 3 && (
            <CIBILInformation formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 4 && (
            <OtherReferenceInformation
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeStep === 5 && (
            <WorkExperience formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 6 && (
            <FathersDocument formData={formData} setFormData={setFormData} />
          )}

          <div style={{ marginTop: "20px" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              style={{ marginRight: "10px" }}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Button onClick={handleNext} variant="contained">
                  Next
                </Button>
              )
            ) : (
              isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  onClick={handleFinalSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainForm;
