import React, { useEffect, useState } from "react";
//prettier-ignore
import { TextField, FormControlLabel, Radio, RadioGroup, FormControl, Container, CircularProgress, Alert, Grid, Select, MenuItem, InputLabel } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer"; //import InvestorList from "../../Shared/PreRenderedComponents/InvestorList";
import ParkList from "../../Shared/PreRenderedComponents/ParkList";
import { ExecuteApiToPost } from "../../../../services/api/ExecuteApiRequests";
import { GetAgreements } from "../../Shared/CommonData/CommonData";
//prettier-ignore
const initialData = { park_id: "", investor_id: "", agreement_id: "", activity_period_start_from: null,
  activity_period_to: null, activity_type: "Export", amount: 0, description: "" };

export default function RegisterInvestorActivities() {
  const [formData, setFormData] = useState(initialData); //  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [investorsInPark, setInvestorInPark] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [agreements, setAgreements] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);

  useEffect(() => {
    const fetchAgreementList = async () => {
      try {
        if (selectedPark) {
          const parkId = selectedPark.id;
          formData.park_id = parkId;
          const responseData = await GetAgreements(parkId); 
          setAgreements(responseData);
          const filteredInvestors = [
            ...new Set(
              responseData
                .filter((agreement) => agreement.park_name === selectedPark.name)
                .map((agreement) => agreement.company_name),
            ),
          ].map((company_name) => responseData.find((agreement) => agreement.company_name === company_name));
          setInvestorInPark(filteredInvestors);
          setFormData({ ...formData, investor_id: "" });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAgreementList();
  }, [selectedPark]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setImportError(null);
    setImportSuccess("");
    try {
      const resultData = ExecuteApiToPost("investors/activities", formData);
      if (resultData) setImportSuccess("Invsetor activity registration succesful"); // Assuming success message from backend
      setFormData(initialData); //console.log("Data saved successfully");
    } catch (error) {
      setImportError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <FormContainer title="Register Investor Activities" onSubmit={handleSubmit}>
        <Grid item xs={12} md={12}>
          <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
        </Grid>
        <Grid item xs={12} md={6}>
          {
            <FormControl fullWidth={true} required>
              <InputLabel id="investor-label">Select Investor</InputLabel>
              <Select
                labelId="investor-label"
                id="investor_id"
                name="investor_id"
                color="info"
                value={formData.investor_id}
                fullWidth={true}
                onChange={handleChange}
              >
                <MenuItem value="">Select Investor</MenuItem>
                {investorsInPark?.length > 0 &&
                  investorsInPark.map((inv, index) => (
                    <MenuItem key={index} value={inv.company_id}>
                      {inv.company_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          }
        </Grid>
        <Grid item xs={12} md={6}>
          {formData.investor_id !== "" && (
            <>
              <span>UPINs: </span>

              {agreements?.map((agr) => agr.company_id === formData.investor_id && <span>[ {agr.upin} ], </span>)}
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Staring from"
            name="activity_period_start_from"
            type="date"
            fullWidth={true}
            value={formData.activity_period_start_from}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="To"
            name="activity_period_to"
            type="date"
            fullWidth={true}
            value={formData.activity_period_to}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl component="fieldset" fullWidth={true} required>
            <RadioGroup
              aria-label="activity"
              name="activity_type"
              defaultValue={formData.activity_type}
              value={formData.activity_type}
              onChange={handleChange}
              row
              required
            >
              <FormControlLabel value="import_substitution" control={<Radio />} label="Import Substitution" />
              <FormControlLabel value="export" control={<Radio />} label="Export" />
              <FormControlLabel value="import" control={<Radio />} label="Import" />
              <FormControlLabel value="employment" control={<Radio />} label="Employment" />
              <FormControlLabel value="linkage" control={<Radio />} label="Linkage" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="Amount in USD or Quantity"
            name="amount"
            fullWidth={true}
            value={formData.amount}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth={true}
            multiline
            rows={4}
            sx={{ mb: 2 }}
            onChange={handleChange}
          />
        </Grid>
      </FormContainer>
      {isLoading && <CircularProgress />}
      {importError && <Alert severity="error">{importError}</Alert>}
      {importSuccess && <Alert severity="success">{importSuccess}</Alert>}
    </Container>
  );
}
/*          {investorsInPark && (
            <Autocomplete
              fullWidth={true}
              options={investorsInPark}
              getOptionLabel={(option) => option.company_name || ""}
              value={selectedInvestor}
              onChange={(event, newValue) => setSelectedInvestor(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select an Investor" variant="outlined" required={isRequired} />
              )}
            />
          )}
*/
