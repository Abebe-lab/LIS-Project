import React, { useEffect, useState } from "react";
import { TextField, Grid, Typography, Input, Container, CircularProgress } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import { ExecutePostWithParams } from "../../../../services/api/ExecuteApiRequests";
import { AgreementListInPark } from "../../Shared/PreRenderedComponents";
import { IPDCFormattedJsonToDisplay } from "../../../../components/Controls";

const initialData = {
  agreement_id: "",
  handover_date: new Date().toISOString().split("T")[0],
  handedover_by: "",
  handedover_to: "",
  notes: "",
  signed_document_path: "",
  description: "",
  park_id: "",
};
export default function RegisterHandover() {
  const decodedUser = useDecodedUser();
  const [formData, setFormData] = useState(initialData);
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);
  useEffect(() => {
    console.log(decodedUser.park_id);
  }, []);
  useEffect(() => {
    if (selectedAgreement) {
      formData.agreement_id = selectedAgreement.id;
    }
  }, [selectedAgreement]);
  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = event => {
    setFormData({
      ...formData,
      signed_document_path: event.target.files[0],
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setImportError(null);
    setImportSuccess(null);
    try {
      const formDataToSend = new FormData();
      formData.agreement_id = selectedAgreement?.id;
      formData.handedover_by = decodedUser?.id;
      formData.handover_date = new Date(formData.handover_date).toISOString().split("T")[0];
      formData.park_id = decodedUser.park_id;
      formDataToSend.append("data", JSON.stringify(formData));
      formDataToSend.append("file", formData.signed_document_path);
      const result = await ExecutePostWithParams(`parks/handover`, formDataToSend, true);
      if (result){
        setImportSuccess(result);
        setFormData(initialData);
        setSelectedAgreement(null);
      }  // Assuming success message from backend
    } catch (error) {
      setImportError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <FormContainer title="Register Handover Details" onSubmit={handleSubmit}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <AgreementListInPark
                parkId={decodedUser.park_id}
                selectedAgreement={selectedAgreement}
                setSelectedAgreement={setSelectedAgreement}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Handover Date"
                type="date"
                name="handover_date"
                fullWidth={true}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Handed Over By"
                name="handedover_by"
                fullWidth={true}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={decodedUser?.full_name}
                disabled
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Handed Over To"
                name="handedover_to"
                fullWidth={true}
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={formData.handedover_to}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                fullWidth={true}
                sx={{ mb: 2 }}
                onChange={handleChange}
                required
                value={formData.notes}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                name="signed_document_path"
                fullWidth={true}
                sx={{ mb: 2 }}
                inputProps={{ accept: "application/pdf,image/*" }}
                onChange={handleFileChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth={true}
                multiline
                rows={4}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container height={"100%"} alignContent={"start"}>
            <Grid item xs={12}>
              <Typography align="center" variant="h5" fontWeight="bold">
                Agreement Details
              </Typography>
            </Grid>
            {selectedAgreement && (
              <Grid item xs={12}>
                <IPDCFormattedJsonToDisplay data={selectedAgreement} height="450px" />
              </Grid>
            )}
          </Grid>

        </Grid>
        <Grid item xs={12}>
            {isLoading && <CircularProgress />}
            {importError && <Typography severity="error">{importError}</Typography>}
            {importSuccess && <Typography severity="success">{importSuccess}</Typography>}
          </Grid>
      </FormContainer>
    </Container>
  );
}
