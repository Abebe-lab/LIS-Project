import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./RegisterAgreementTabs";
import { ExecutePostWithParams, GetDataFromApiWithParams, ExecutePostWithParamsWithErrMsg } from "../../../../services/api/ExecuteApiRequests";
import { IPDCToastMessageResult } from "../../../../components/Controls";
import FormContainer from "../../../../components/Forms/FormContainer";

//prettier-ignore
const initialData = { tenant_id: "", upin: "", ownership_type: "", investment_type: "", contract_issue: "", contract_renewal: "", 
  moe_signed: "", production_capacity: "", handover_date: "", rehandover_date: "", production_commencement_date: "", 
  market_destination: [], intl_brands_link: [], disposal_method: "", export_capacity: "", employee_capacity: "", monthly_rent: "", 
  grace_period_ending_date: "", security: "", advance_payment: "", annual_mngmnt_service_fee: "", payment_mode: "", 
  late_charge_fee: "", contract_period: "", description: "", agreement_id: "", current_status: "NEW", mou_attachment: "", penality_rate: '%', area_as_per_contract_in_m2: "" 
};
//prettier-ignore
const steps = [ 
  "Basic Information", "Investment & Contract Details", "Production & Capacity", "Market & Disposal", "Financial & Contractual Details", "Summary & Description"
];

export default function RegisterAgreement() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPark, setSelectedPark] = useState(null);
  const [parcelInPark, setParcelInPark] = useState(null);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState(initialData);
  const [error,setError]=useState(null);

  useEffect(() => {
    const fetchUPIN = async parkId => {
      const res = await GetDataFromApiWithParams(`availableParcelsInPark/${parkId}`, { params: { id: parkId } });
      if (res) {
        setParcelInPark(res);
      }
    };
    if (selectedPark) {
      fetchUPIN(selectedPark.id);
      console.log(selectedPark.id);
    }
  }, [selectedPark]);

  const handleChange = e => {
    const { name, value } = e.target;
    const newValue = name === "mou_attachment" ? e.target.files[0] : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };
  // Validation for each step
  const validateStep = step => {
    //prettier-ignore
    switch (step) {
      case 0: return formData.upin && formData.ownership_type && selectedPark && selectedInvestor;
      case 1: return formData.investment_type && formData.contract_issue;
      case 2: return formData.production_capacity && formData.production_commencement_date;
      case 3: return formData.market_destination.length > 0 && formData.disposal_method;
      case 4: return formData.monthly_rent && formData.annual_mngmnt_service_fee && formData.payment_mode && formData.grace_period_ending_date && formData.security && formData.area_as_per_contract_in_m2;
      default: return true;
    }
  };
  const nextStep = e => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep(prevStep => prevStep + 1);
      setToastMessage({ message: "", type: "" });
    } else {
      setToastMessage({ message: "Please fill all required fields before proceeding.", type: "warning" });
    }
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmission = async e => {
    e.preventDefault();
    try {
      //todo consider adding attachment mou /*formData.tenant_id = selectedInvestor ? selectedInvestor.id : null;*/
      //const submissionData = { ...formData, tenant_id: selectedInvestor ? selectedInvestor.id : null };
      const formDataForApi = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'mou_attachment') {
          formDataForApi.append('file', value);
        } else {
          formDataForApi.append(key, value);
        }
      });
      //console.log(submissionData);
    
      const responseData = await ExecutePostWithParamsWithErrMsg("agreements", formDataForApi);

      if (responseData) {
        setToastMessage({ message: "Agreement successfully saved!", type: "success" });
        resetForm();
      } else {
        setToastMessage({ message: "Error saving agreement. Please try again.", type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setFormData(initialData);
    setSelectedPark(null);
    setSelectedInvestor(null);
    setParcelInPark(null);
    setCurrentStep(0);
  };
  // Render steps based on currentStep
  const renderStep = () => {
    const props = { formData, handleChange, nextStep, prevStep };
    //prettier-ignore
    switch (currentStep) {
      case 0:return <Step1 {...props} selectedPark={selectedPark} setSelectedPark={setSelectedPark} parcelInPark={parcelInPark} selectedInvestor={selectedInvestor} setSelectedInvestor={setSelectedInvestor} />;
      case 1: return <Step2 {...props} />;
      case 2: return <Step3 {...props} />;
      case 3: return <Step4 {...props} />;
      case 4: return <Step5 {...props} />;
      case 5: return <Step6 {...props} handleSubmission={handleSubmission} />;
      default: return null;
    }
  };
  return (
    <FormContainer title="Register Agreement" showButton={false}>
      <Stepper activeStep={currentStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStep()}
      {toastMessage.message && <IPDCToastMessageResult message={toastMessage.message} type={toastMessage.type} />}
    </FormContainer>
  );
}
