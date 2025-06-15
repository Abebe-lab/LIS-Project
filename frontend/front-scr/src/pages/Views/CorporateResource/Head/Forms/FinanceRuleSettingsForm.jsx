// FinanceRuleSetting.js
import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Tab,
  Tabs,
  Box,
  Paper,
} from "@mui/material";
import useDecodedUser from "../../../../../services/hooks/useDecodedUser";
import FormContainer from "../../../../../components/Forms/FormContainer";
import { ExecuteApiToPost } from "../../../../../services/api/ExecuteApiRequests";

const FinanceRuleSettingsForm = () => {
  const decodedUser = useDecodedUser();
  const [ruleType, setRuleType] = useState("General rule");
  const [formData, setFormData] = useState({
    ruleId: "",
    title: "",
    advancePaymentDeduction: "",
    maxWaitingPeriod: "",
    advancePaymentPercentage: "",
    lateChargeFeePercentage: "",
    maxGracePeriod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRuleTypeChange = (e) => {
    setRuleType(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const responseData = await ExecuteApiToPost('finances/rule');     
      
      console.log("Form data submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <FormContainer title="Finance Rule Setting" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          label="Rule ID"
          name="ruleId"
          value={formData.ruleId}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="type"
            name="ruleType"
            value={ruleType}
            onChange={handleRuleTypeChange}
            row
          >
            <FormControlLabel
              value="Offers and limitations"
              control={<Radio />}
              label="Offers and limitations"
            />
            <FormControlLabel
              value="General rule"
              control={<Radio />}
              label="General rule"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Tabs
            value={ruleType}
            onChange={(e, newValue) => setRuleType(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Offers and limitations"
              value="Offers and limitations"
            />
            <Tab label="General rule" value="General rule" />
          </Tabs>
          {ruleType === "Offers and limitations" && (
            <Box p={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    label="Advance Payment Deduction"
                    name="advancePaymentDeduction"
                    value={formData.advancePaymentDeduction}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    label="Maximum Waiting Days"
                    name="maxWaitingPeriod"
                    value={formData.maxWaitingPeriod}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    label="Advance Payment %"
                    name="advancePaymentPercentage"
                    value={formData.advancePaymentPercentage}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {ruleType === "General rule" && (
            <Box p={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    label="Late Charge Fee %"
                    name="LateChargeFeePercentage"
                    value={formData.lateChargeFeePercentage}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    label="Maximum Grace Period"
                    name="maxGracePeriod"
                    value={formData.maxGracePeriod}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Grid>
    </FormContainer>
  );
};

export default FinanceRuleSettingsForm;
