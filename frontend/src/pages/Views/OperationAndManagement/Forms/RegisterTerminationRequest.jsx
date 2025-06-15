import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select, TextField, Typography, InputLabel, FormControl } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";
import { ExecuteApiToPost, ExecutePostWithParams, GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
import { IPDCAttachFile1, IPDCFormattedJsonToDisplay } from "../../../../components/Controls";

const RegisterTerminationRequest = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [agreementDetails, setAgreementDetails] = useState(null);
  const [requestDate, setRequestDate] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch agreements from the API
    const fetchAgreements = async () => {
      try {
        const responseData = await GetDataFromApiWithParams("agreements");
        setAgreements(responseData);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      }
    };

    fetchAgreements();
  }, []);

  const handleAgreementChange = event => {
    const agreementId = event.target.value;
    setSelectedAgreement(agreementId);

    // Fetch details of the selected agreement
    const selected = agreements.find(agreement => agreement.id === agreementId);
    setAgreementDetails(selected);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!selectedAgreement) return;
    try {
      const formData = new FormData();
      formData.append("request_date", requestDate);
      formData.append("reason", reason);
      formData.append("description", description);
      if (file) formData.append("file", file);

      setLoading(true);
      const responseData = await ExecutePostWithParams(`agreements/${selectedAgreement}/terminationRequest`, formData,file);
      console.log("Termination request submitted:", responseData);
      // Reset form after submission
      setSelectedAgreement("");
      setAgreementDetails(null);
      setRequestDate("");
      setReason("");
      setDescription("");
      setFile(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer title="Register Termination Request" onSubmit={handleSubmit}>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth={true}>
              <InputLabel id="agreement-select-label">Select Agreement</InputLabel>
              <Select
                labelId="agreement-select-label"
                value={selectedAgreement}
                onChange={handleAgreementChange}
                label="Select Agreement"
              >
                {agreements && agreements?.length > 0 &&agreements.map((agreement, index) => (
                  <MenuItem key={index} value={agreement.id}>
                    {agreement.id} {/* Adjust this as per the agreement properties */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth={true}
              label="Request Date"
              type="date"
              value={requestDate}
              onChange={e => setRequestDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth={true} label="Reason" value={reason} onChange={e => setReason(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          {agreementDetails && (
            <Grid item xs={12}>
              <Typography variant="subtitle1">Agreement Details:</Typography>
              <IPDCFormattedJsonToDisplay data={agreementDetails} />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <IPDCAttachFile1 onChange={files => setFile(files[0])} isMultiple={true} />
      </Grid>
    </FormContainer>
  );
};

export default RegisterTerminationRequest;
