import { useState } from "react";
import { toast } from "react-toastify";
//prettier-ignore
import { Box, Button, Step, StepLabel, Stepper, Grid } from "@mui/material";
import { ExecuteApiToPost } from "../../../../services/api/ExecuteApiRequests";
import BasicInfo from "./RegisterProspectiveInvestor/BasicInfo";
import PIAddress from "./RegisterProspectiveInvestor/PIAddress";
import PIAttachment from "./RegisterProspectiveInvestor/PIAttachment";
import FormContainer from "../../../../components/Forms/FormContainer";

//import {BasicInfo, PIAddress, PIAttachment} from './RegisterProspectiveInvestor';
//prettier-ignore
const INITIAL_FORM_DATA = { id: "", tin_no: "0000000000", company_name: "", contact_person: "", phone_no: "", mobile_no: "",
  email: "", website: "", nationality_origin: "", city: "", specific_location: "", description: "",
  application_file: "", license: "", propsal_attached: "", legal_documents: ""};

const steps = ["Basic Info", "PI Address", "PI Attachment"];
const RegisterProspectiveInvestor = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setActiveStep(0);
  };

  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const saveDataToDb = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("data", JSON.stringify(formData));
      formDataToSubmit.append("application", formData.application_file);
      formDataToSubmit.append("license", formData.license);
      formDataToSubmit.append("proposal", formData.propsal_attached);
      formDataToSubmit.append("legal_documents", formData.legal_documents);
      const response = await ExecuteApiToPost("prospectiveInvestors", formDataToSubmit);

      if (response) {
        //prettier-ignore
        toast("Prospective investor registration is successful!", { type: "success", position: "bottom-right", autoClose: 3000 });
        return true;
      } else {
        //prettier-ignore
        toast("Prospective investor registration failed: " + response, { type: "error", position: "bottom-right", autoClose: 3000 });
        return false;
      }
    } catch (error) {
      toast(error.message, { type: "error", position: "bottom-right", autoClose: 3000 });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      if (await saveDataToDb()) {
        handleReset();
      }
    } else {
      handleNext();
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInfo {...formData} updateFields={updateFields} />;
      case 1:
        return <PIAddress {...formData} updateFields={updateFields} />;
      case 2:
        return <PIAttachment {...formData} updateFields={updateFields} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <FormContainer title="Prospective Investor Registration" onSubmit={handleSubmit} showButton={false}>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {getStepContent(activeStep)}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Button type="submit">{activeStep === steps.length - 1 ? "Register" : "Next"}</Button>
        </Box>
      </Grid>
    </FormContainer>
  );
};

export default RegisterProspectiveInvestor;
