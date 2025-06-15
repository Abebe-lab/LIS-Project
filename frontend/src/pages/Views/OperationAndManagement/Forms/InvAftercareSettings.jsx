import React, { useState } from "react";
import { Grid, TextField, Button, InputAdornment, MenuItem } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";
import { ExecutePostWithParams } from "../../../../services/api/ExecuteApiRequests";

const FEE_TYPE = ["Percent", "Month", "Fixed Amount"];
const initialData = {
  rule_title: "Operation & Management Rules",
  referenceDocuments: null,
  EarlyTerminationFee: 3,
  EarlyTerminationFeeCalculationType: FEE_TYPE[1],
  TransferFee: 0,
  TransferFeeCalculationType: FEE_TYPE[0],
  description: "",
};

export default function InvAftercareSettings() {
  const [formData, setFormData] = useState(initialData);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("id", formData.id);
    formDataToSubmit.append("EarlyTerminationFeeCalculationType", formData.EarlyTerminationFeeCalculationType);
    formDataToSubmit.append("EarlyTerminationFee", formData.EarlyTerminationFee);
    formDataToSubmit.append("TransferFeeCalculationType", formData.TransferFeeCalculationType);
    formDataToSubmit.append("TransferFee", formData.TransferFee);
    formDataToSubmit.append("files", formData.referenceDocuments);
    formDataToSubmit.append("description", formData.description);

    try {
      const responseData = await ExecutePostWithParams("rule/operation", formDataToSubmit, true);

      console.log("Form data submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <FormContainer title="Operation & Management Rule Settings" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          label="Rules Title"
          name="rule_title"
          value={formData.rule_title}
          onChange={handleChange}
          placeholder="Rule No"
          required
          fullWidth={true}
          margin="normal"
        />
      </Grid>

      {["EarlyTermination", "Transfer"].map(feeType => (
        <React.Fragment key={feeType}>
          <Grid item xs={12} sm={4}>
            <TextField
              label={`${feeType} Fee`}
              name={`${feeType}Fee`}
              type="number"
              value={formData[`${feeType}Fee`]}
              onChange={handleChange}
              placeholder={`${feeType} Fee`}
              fullWidth={true}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {formData[`${feeType}FeeCalculationType`] === "Percent" ? "%" : "$"}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              select
              label={`Of transaction`}
              name={`${feeType}FeeCalculationType`}
              value={formData[`${feeType}FeeCalculationType`]}
              onChange={handleChange}
              fullWidth={true}
              margin="normal"
            >
              {FEE_TYPE.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={4} alignContent={"center"}>
            <Button variant="contained" component="label" fullWidth={true} margin="normal">
              Attach Reference Document
              <input type="file" name="referenceDocument" hidden onChange={handleChange} />
            </Button>
          </Grid>
        </React.Fragment>
      ))}

      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          multiline
          minRows={3}
          fullWidth={true}
          margin="normal"
        />
      </Grid>
    </FormContainer>
  );
}
