import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
  Alert,
  Button,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Input,
  FormHelperText
} from "@mui/material";
import { Search, ExpandMore } from "@mui/icons-material";
import FormContainer from "../../../../../components/Forms/FormContainer";
import { ExecuteApiToPost, ExecutePostWithParams, GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
import AgreementList from "../../../Shared/PreRenderedComponents/AgreementList";
import { IPDCToastMessageResult } from "../../../../../components/Controls";

const initialData = {
  invoice_no: "",
  agreement_id: "",
  amount: "",
  payment_date: "",
  payment_type: "Rental",
  bank_name: "",
  reference_no: "",
  description: "",
  if_late_penality_interest_amount: "0.0",
  recieved_by: "",
  payment_period: "",
  arrear_skipped_amount: "",
  arrear_skipping_description: "",
  attachment: null
};

const steps = [
  {
    title: "Basic Information",
    fields: ["invoice_no", "agreement_id", "amount", "payment_date"],
    requiredFields: ["invoice_no", "agreement_id", "amount", "payment_date"],
  },
  {
    title: "Payment Details",
    fields: ["bank_name", "reference_no", "description", "payment_type"],
    requiredFields: ["bank_name", "reference_no", "payment_type"],
  },
  { 
    title: 'Arrears Information', 
    fields: ['arrear_skipped_amount', 'arrear_skipping_description', 'attachment'],
    requiredFields: [] // Adjust based on your requirement
  },
  {
    title: "Additional Info",
    fields: ["if_late_penality_interest_amount", "recieved_by", "payment_period"],
    requiredFields: ["recieved_by"],
  },
];

const CollectPayment = () => {
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [paymentType, setPaymentType] = useState(initialData.payment_type);
  const [formData, setFormData] = useState(initialData);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [agreementDetail, setAgreementDetail] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
// New state for tracking if payment amount is less than monthly rent
const [isPaymentLessThanRent, setIsPaymentLessThanRent] = useState(false);

useEffect(() => {
  if (selectedAgreement) {
    setFormData(prevData => ({ ...prevData, agreement_id: selectedAgreement.id }));
  }
  if (agreementDetail && agreementDetail.length > 0) {
    // Check if payment amount is less than monthly rent
    const monthlyRent = agreementDetail[0].monthly_rent;
    setIsPaymentLessThanRent(parseFloat(formData.amount) < parseFloat(monthlyRent));
  }
}, [selectedAgreement, agreementDetail, formData.amount]);

  const fetchAgreementDetails = async () => {
    try {
      const agreementId = formData.agreement_id || (selectedAgreement && selectedAgreement.id);
      if (!agreementId) return;

      const resultData = await GetDataFromApiWithParams(`agreements/${agreementId}`);
      if (resultData && resultData.length > 0) {
        setAgreementDetail(resultData);
        setPaymentType(resultData[0].ownership_type === "rent" ? "Rental" : "Lease");
      }
    } catch (error) {
      console.error("Failed to fetch agreement details:", error);
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prevData => ({ ...prevData, attachment: file }));
  };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
     // Re-check payment amount if it's the amount field that changed
     if(name === 'amount' && agreementDetail && agreementDetail.length > 0) {
      const monthlyRent = agreementDetail[0].monthly_rent;
      setIsPaymentLessThanRent(parseFloat(value) < parseFloat(monthlyRent));
    }
  };

  const handlePaymentTypeChange = e => {
    setPaymentType(e.target.value);
    setFormData(prevData => ({ ...prevData, payment_type: e.target.value }));
  };
  const validateStep = stepIndex => {
    const errors = {};
    const step = steps[stepIndex];
    step.requiredFields.forEach(field => {
      if (!formData[field] || (field === "amount" && parseFloat(formData[field]) <= 0)) {
        errors[field] = "This field is required";
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateStep(steps.length - 1)) {
      try {
        const formDataForApi = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'attachment') {
            formDataForApi.append('file', value);
          } else {
            formDataForApi.append(key, value);
          }
        });
        const result = await ExecutePostWithParams("finances/collections", formDataForApi, true);
        if (result) {
          setSuccessMessage("Payment collection information successfully saved!");
          setFormData(initialData);
          setActiveStep(0); // Reset to first step after submission
        }
      } catch (err) {
        console.error("Error saving payment:", err);
        setErrorMessage("Saving payment was unsuccessful, please try again!");
      }
    }
  };

  const renderTextField = (name, label, type = "text") => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={formData[name]}
      onChange={handleInputChange}
      type={type}
      required={steps[activeStep].requiredFields.includes(name)}
      error={!!validationErrors[name] || (name === 'amount' && isPaymentLessThanRent)}
      helperText={validationErrors[name] || (name === 'amount' && isPaymentLessThanRent ? "Payment amount is less than monthly rent." : '')}
      InputLabelProps={type === "date" ? { shrink: true } : {}}
    />
  );

  const renderStepContent = step => (
    <Grid container spacing={2}>
      {step.fields.map(field => (
        <Grid item xs={12} key={field}>
          {field === 'attachment' ? (
            <FormControl fullWidth>
              <Input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FormHelperText>{formData.attachment ? formData.attachment.name : 'No file chosen'}</FormHelperText>
            </FormControl>
          ) : (
            renderTextField(field, field.split(/(?=[A-Z])/).join(" "), 
              field === "payment_date" ? "date" : 
              field === "amount" || field === "if_late_penality_interest_amount" || field === "arrear_skipped_amount" ? "number" : "text")
          )}
        </Grid>
      ))}
      {step.title === "Payment Details" && (
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Payment Type:</FormLabel>
            <RadioGroup
              aria-label="paymentType"
              name="payment_type"
              value={paymentType}
              onChange={handlePaymentTypeChange}
              row
            >
              <FormControlLabel value="Rental" control={<Radio />} label="Rental" />
              <FormControlLabel value="Lease" control={<Radio />} label="Lease" />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );

  const renderAgreementDetails = () =>
    //console.log(agreementDetail);
    agreementDetail && (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {["id","park_name", "company_name", "ownership_type","monthly_rent","annual_mngmnt_service_fee", "contract_status"].map(key => (
            <React.Fragment key={key}>
              <Grid item xs={5}>
                <Typography variant="body1" fontWeight="bold">
                  {key.split("_").join(" ")}:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1">{agreementDetail[0][key]}</Typography>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Typography variant="h6" align="center" fontWeight="bold">
              Parcels in Agreement:
            </Typography>
          </Grid>
          {agreementDetail &&
            agreementDetail.length > 0 &&
            agreementDetail.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    UPIN:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{item.upin}</Typography>
                </Grid>
              </React.Fragment>
            ))}
        </Grid>
      </Box>
    );

  return (
    <FormContainer title="Collect Payment" showButton={false}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.title}>
                <StepLabel>{step.title}</StepLabel>
                <StepContent>
                  {renderStepContent(step)}
                  <Box sx={{ mb: 2 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Agreement Detail
            </Typography>

            <Grid item xs={12} my={2}>
              <Grid container spacing={1}>
                <Grid item xs={9}>
                  <AgreementList
                    selectedAgreement={selectedAgreement}
                    setSelectedAgreement={setSelectedAgreement}
                    required={true}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button startIcon={<Search />} onClick={fetchAgreementDetails}>
                    View Detail
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {(errorMessage || successMessage) && (
              <IPDCToastMessageResult
                message={errorMessage || successMessage}
                type={errorMessage ? "error" : "success"}
              />
            )}
            {renderAgreementDetails()}
          </Paper>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default CollectPayment;
