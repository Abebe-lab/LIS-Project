import React, { useEffect, useState } from "react";
import { TextField, CircularProgress, Alert, Grid, Typography } from "@mui/material";

import FormContainer from "../../../../components/Forms/FormContainer";
import InvestorList from "../../Shared/PreRenderedComponents/InvestorList";

import { ExecutePostWithParams } from "../../../../services/api/ExecuteApiRequests";
import {AgreementList} from "../../Shared/PreRenderedComponents";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import { IPDCAttachFile1, IPDCFormattedJsonToDisplay } from "../../../../components/Controls";
//}
//prettier-ignore
const initialData = { agreement_id: "",date_of_transfer: "", transfered_from: "", transfered_to: "", reason: "", signed_document_path: "", description: "", registered_by: "" };

const TransferPropertyForm = () => {
  const [formData, setFormData] = useState(initialData);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [transferredTo, setTransferredTo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);
  const decodedUser = useDecodedUser();

  const handleFileChange = event => {
    setFormData({ ...formData, signed_document_path: event.target.files[0] });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {}, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      console.log(formData);
      formData.agreement_id = selectedAgreement?.id;
      formData.transfered_from = selectedAgreement?.company_id;
      formData.transfered_to = transferredTo?.id;
      formData.registered_by = decodedUser.id;
      formData.date_of_transfer = new Date().toISOString().split("T")[0];
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(formData));
      formDataToSend.append("file", formData.signed_document_path);
      const result = await ExecutePostWithParams("investors/propertyTransfer", formDataToSend, true);
      if (result) {
        setImportSuccess(result); // Assuming success message from backend
        setFormData(initialData);
        setImportSuccess("Successfully Registered");
      }
    } catch (error) {
      setImportError("An error occurred during registration. Please try again.");
      console.log("Failed to save data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormContainer title="Register Transfer Details" onSubmit={handleSubmit}>
        <Grid item xs={6} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Date of Transfer"
                type="date"
                name="date_of_transfer"
                fullWidth={true}
                defaultValue={new Date().toISOString().split("T")[0]}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                //onChange={e=>formData.date_of_transfer=e.target.value}
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography>Agreement Id</Typography>
            </Grid>
            <Grid item xs={9} md={9}>
              <AgreementList selectedAgreement={selectedAgreement} setSelectedAgreement={setSelectedAgreement} />
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography>Transferred To</Typography>
            </Grid>
            <Grid item xs={9} md={9}>
              <InvestorList selectedInvestor={transferredTo} setSelectedInvestor={setTransferredTo} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Reason"
                name="reason"
                fullWidth={true}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              Attach Signed Documents
              <input
                accept="image/*"
                multiple
                type="file"
                label="Signed Document Path1"
                name="signed_document_path"
                fullWidth={true}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth={true}
                multiline
                rows={4}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                //value={formData.description}
              />
            </Grid>
            {isLoading && <CircularProgress />}
            {importError && <Alert severity="error">{importError}</Alert>}
            {importSuccess && <Alert severity="success">{importSuccess}</Alert>}
          </Grid>
        </Grid>
        <Grid item xs={6} md={6}>
        <Grid container sx={{height: '100%'}}>
          {selectedAgreement && (
            <Grid item xs={12}>
              <Typography variant="subtitle1">Agreement Details:</Typography>
              <IPDCFormattedJsonToDisplay data={selectedAgreement} height="400px" />
            </Grid>
          )}
          
        </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

export default TransferPropertyForm;
