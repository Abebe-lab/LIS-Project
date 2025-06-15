import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Paper, Box, Container,  Alert, Typography } from "@mui/material";//useMediaQuery, useTheme,
import GeneralInfoTab from "./GeneralInfoTab";
import PermitInfoTab from "./PermitInfoTab";
import CommitmentTab from "./CommitmentTab";
import useDecodedUser from "../../../../../../services/hooks/useDecodedUser"; 
import IPDCFormHeader from "../../../../../../components/Forms/IPDCFormHeader";
import { ExecutePostWithParams } from "../../../../../../services/api/ExecuteApiRequests";

const initialData = {
  value: 0, // Step state
  permitNo: "",
  requestDate: new Date().toISOString().slice(0, 10),
  requestType: "",
  parcelWithUPIN: {},
  agreementId: "",
  consultant: "",
  contractor: "",
  startingDate: "",
  finishingDate: "",
  numberOfBuildings: "",
  residenceCount: 0,
  commercialCount: 0,
  shedCount: 0,
  otherCount: 0,
  modificationDetails: "",
  architecturalPlan: null,
  structuralPlan: null,
  sanitaryPlan: null,
  electricalPlan: null,
  electroMechanicalPlan: null,
  environmentalPlan: null,
  otherPlan: null,
  otherPlanDetails: "",
  ownerCommitment: "",
  consultantCommitment: "",
  contractorCommitment: "",
  description: "",
  responseMessage: "",
};
function RegisterBPRequest() {
  const decodedUser  = useDecodedUser();
  //const theme = useTheme();
  //const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState(initialData);

  const handleNext = () => {
    setFormData({ ...formData, value: formData?.value + 1 });
  };

  const handleBack = () => {
    setFormData({ ...formData, value: formData?.value - 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        permit_no: formData?.permitNo,
        requested_on: formData?.requestDate,
        request_type: formData?.requestType,
        agreement_id: formData?.agreementId,
        consultant_id: formData?.consultant?.id,
        contractor_id: formData?.contractor?.id,
        expected_starting_date: formData?.startingDate,
        expected_finishing_date: formData?.finishingDate,
        no_of_residence_bldgs: formData?.residenceCount,
        no_of_commercial_bldgs: formData?.commercialCount,
        no_of_sheds: formData?.shedCount,
        no_of_other_bldgs: formData?.otherCount,
        other_bldg_description: formData?.modificationDetails,
        modification_details: formData?.modificationDetails,
        permit_registered_on: formData?.requestDate,
        request_registered_by: decodedUser?.id,
        permit_issued_by: "",
        issued_on: "1/1/1900",
        description: formData?.description,
      };

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("data", JSON.stringify(data));

      formData?.architecturalPlan && formDataToSubmit.append("architectural", formData.architecturalPlan);
      formData?.structuralPlan && formDataToSubmit.append("structural", formData.structuralPlan);
      formData?.sanitaryPlan && formDataToSubmit.append("sanitary", formData.sanitaryPlan);
      formData?.electricalPlan && formDataToSubmit.append("electrical", formData.electricalPlan);
      formData?.electroMechanicalPlan && formDataToSubmit.append("electroMechanical", formData.electroMechanicalPlan);
      formData?.environmentalPlan && formDataToSubmit.append("environmental", formData.environmentalPlan);
      formData?.otherPlan && formDataToSubmit.append("other", formData.otherPlan);

      formData?.ownerCommitment && formDataToSubmit.append("ownerCommitment", formData.ownerCommitment);

      formData?.consultantCommitment && formDataToSubmit.append("consultantCommitment", formData.consultantCommitment);
      formData?.contractorCommitment && formDataToSubmit.append("contractorCommitment", formData.contractorCommitment);

      const responseData = await ExecutePostWithParams(`buildingPermits`, formDataToSubmit);
      console.log(responseData);
      setFormData(initialData);
      setFormData({ ...formData, value: 0 });
      setFormData({
        ...formData,
        responseMessage: <Alert severity="success"><Typography>Building Permit Registration successful!</Typography></Alert>,
      });
    } catch (error) {
      setFormData({
        ...formData,
        responseMessage: <Alert severity="error"><Typography>Building Permit Registration failed: + {error.message} </Typography></Alert>,
      });
    }
  };

  const steps = [
    {
      label: "General Information",
      component: (
        <GeneralInfoTab
          requestDate={formData?.requestDate}
          setRequestDate={(value) => setFormData({ ...formData, requestDate: value })}
          requestType={formData?.requestType}
          setRequestType={(value) => setFormData({ ...formData, requestType: value })}
          agreementId={formData?.agreementId}
          setAgreementId={(value) => setFormData({ ...formData, agreementId: value })}
          consultant={formData?.consultant}
          setConsultant={(value) => setFormData({ ...formData, consultant: value })}
          contractor={formData?.contractor}
          setContractor={(value) => setFormData({ ...formData, contractor: value })}
        />
      ),
    },
    {
      label: "Permit Information",
      component: (
        <PermitInfoTab
          startingDate={formData?.startingDate}
          setStartingDate={(value) => setFormData({ ...formData, startingDate: value })}
          finishingDate={formData?.finishingDate}
          setFinishingDate={(value) => setFormData({ ...formData, finishingDate: value })}
          numberOfBuildings={formData?.numberOfBuildings}
          setNumberOfBuildings={(value) => setFormData({ ...formData, numberOfBuildings: value })}
          residenceCount={formData?.residenceCount}
          setResidenceCount={(value) => setFormData({ ...formData, residenceCount: value })}
          commercialCount={formData?.commercialCount}
          setCommercialCount={(value) => setFormData({ ...formData, commercialCount: value })}
          shedCount={formData?.shedCount}
          setShedCount={(value) => setFormData({ ...formData, shedCount: value })}
          otherCount={formData?.otherCount}
          setOtherCount={(value) => setFormData({ ...formData, otherCount: value })}
          modificationDetails={formData?.modificationDetails}
          setModificationDetails={(value) => setFormData({ ...formData, modificationDetails: value })}
          architecturalPlan={formData?.architecturalPlan}
          setArchitecturalPlan={(value) => setFormData({ ...formData, architecturalPlan: value })}
          structuralPlan={formData?.structuralPlan}
          setStructuralPlan={(value) => setFormData({ ...formData, structuralPlan: value })}
          sanitaryPlan={formData?.sanitaryPlan}
          setSanitaryPlan={(value) => setFormData({ ...formData, sanitaryPlan: value })}
          electricalPlan={formData?.electricalPlan}
          setElectricalPlan={(value) => setFormData({ ...formData, electricalPlan: value })}
          electroMechanicalPlan={formData?.electroMechanicalPlan}
          setElectroMechanicalPlan={(value) => setFormData({ ...formData, electroMechanicalPlan: value })}
          environmentalPlan={formData?.environmentalPlan}
          setEnvironmentalPlan={(value) => setFormData({ ...formData, environmentalPlan: value })}
          otherPlan={formData?.otherPlan}
          setOtherPlan={(value) => setFormData({ ...formData, otherPlan: value })}
          otherPlanDetails={formData?.otherPlanDetails}
          setOtherPlanDetails={(value) => setFormData({ ...formData, otherPlanDetails: value })}
        />
      ),
    },
    {
      label: "Commitments & Description",
      component: (
        <CommitmentTab
          ownerCommitment={formData?.ownerCommitment}
          setOwnerCommitment={(value) => setFormData({ ...formData, ownerCommitment: value })}
          consultantCommitment={formData?.consultantCommitment}
          setConsultantCommitment={(value) => setFormData({ ...formData, consultantCommitment: value })}
          contractorCommitment={formData?.contractorCommitment}
          setContractorCommitment={(value) => setFormData({ ...formData, contractorCommitment: value })}
          description={formData?.description}
          setDescription={(value) => setFormData({ ...formData, description: value })}
        />
      ),
    },
  ];

  return (
    <Container
      elevation={3}
      sx={{
        width: "80%",
        //height: isSmallScreen ? "auto" : "60%",
        alignItems: "center",
        padding: 2,
        //margin: "20px auto",
      }}
    >
      <Paper>
        <Box>
          <IPDCFormHeader title={"Building Permit Registration"} />
        </Box>
        <Box>
          <Box my={2}>
            <Stepper activeStep={formData?.value}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box>{steps[formData?.value].component}</Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            {formData?.value > 0 && (
              <Button variant="contained" color="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
            {formData?.value < steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
          {formData?.responseMessage && <p>{formData?.responseMessage}</p>}
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterBPRequest;
