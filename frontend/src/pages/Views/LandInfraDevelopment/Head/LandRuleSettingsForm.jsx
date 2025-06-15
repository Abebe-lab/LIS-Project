import React, { useState } from "react";
import { Grid, TextField, Typography, Button, InputAdornment, MenuItem } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";
import { ExecutePostWithParams } from "../../../../services/api/ExecuteApiRequests";

const FEE_TYPE = ['Percent', 'Fixed Amount'];
const initialData = {
  id: "",
  minArea: "",
  minFrontage: "",
  referenceDocument: "",
  description: "",
  BPFeeCalculationType: FEE_TYPE[0],
  BPFee: 0,
  OPFeeCalculationType: FEE_TYPE[0],
  OPFee: 0,
  TransferFeeCalculationType: FEE_TYPE[0],
  TransferFee: 0,
};

export default function LandRuleSettingsForm() {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', formData.id);
    formDataToSubmit.append('minArea', formData.minArea);
    formDataToSubmit.append('minFrontage', formData.minFrontage);
    formDataToSubmit.append('referenceDocument', formData.referenceDocument);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('BPFeeCalculationType', formData.BPFeeCalculationType);
    formDataToSubmit.append('BPFee', formData.BPFee);
    formDataToSubmit.append('OPFeeCalculationType', formData.OPFeeCalculationType);
    formDataToSubmit.append('OPFee', formData.OPFee);
    formDataToSubmit.append('TransferFeeCalculationType', formData.TransferFeeCalculationType);
    formDataToSubmit.append('TransferFee', formData.TransferFee);

    try {
      const responseData = await ExecutePostWithParams('Finance/Land/Rule', formDataToSubmit,true );

      console.log("Form data submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <FormContainer title="Executives Rule Settings" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          label="Rule No"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Rule No"
          required
          fullWidth={true}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Minimum area for split"
          name="minArea"
          type="number"
          value={formData.minArea}
          onChange={handleChange}
          placeholder="Minimum area for split"
          required
          fullWidth={true}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                m<sup>2</sup>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Minimum frontage for split"
          name="minFrontage"
          type="number"
          value={formData.minFrontage}
          onChange={handleChange}
          placeholder="Minimum frontage for split"
          required
          fullWidth={true}
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">Meters</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" component="label" fullWidth={true} margin="normal">
          Upload Reference Document
          <input type="file" name="referenceDocument" hidden onChange={handleChange} />
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          {formData.referenceDocument ? formData.referenceDocument.name : "No file selected"}
        </Typography>
      </Grid>
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
      {['BP', 'OP', 'Transfer'].map((feeType) => (
        <React.Fragment key={feeType}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label={`${feeType} Fee Calculation Type`}
              name={`${feeType}FeeCalculationType`}
              value={formData[`${feeType}FeeCalculationType`]}
              onChange={handleChange}
              fullWidth={true}
              margin="normal"
            >
              {FEE_TYPE.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                    {formData[`${feeType}FeeCalculationType`] === 'Percent' ? '%' : '$'}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </React.Fragment>
      ))}
    </FormContainer>
  );
}
