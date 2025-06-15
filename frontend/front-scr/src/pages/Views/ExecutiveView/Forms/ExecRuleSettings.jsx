import React, { useState } from 'react';
import { Grid, TextField, Typography, Button, InputAdornment } from '@mui/material';
import FormContainer from "../../../../components/Forms/FormContainer";

const initialData = {
  id: '',
  minArea: '',
  minFrontage: '',
  referenceDocument: '',
  description: '',
};

export default function ExecRuleSettings() {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	//todo: submit rules to the database
	//POST eic/ruleSettings

    console.log('Form data submitted:', formData);
    // Handle form submission logic here
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
            endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
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
          <input
            type="file"
            name="referenceDocument"
            hidden
            onChange={handleChange}
          />
        </Button>
      </Grid>
	  <Grid item xs={6}>
		<Typography variant="body1">
		  {formData.referenceDocument ? formData.referenceDocument.name : 'No file selected'}
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
    </FormContainer>
  );
}
