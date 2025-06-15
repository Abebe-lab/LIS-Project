import React from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { IPDCAttachFile1 } from "../../../../../components/Controls/IPDCAttachFile";
const Step6 = ({ formData, handleChange, handleSubmission, prevStep }) => {
  const handleFileChange = files => {
    formData.mou_attachment = files;
    console.log("Updated MOU Attachment:", files);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Step 6: Summary & Description</Typography>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          multiline={true}
        />
      </Grid>
      <Grid item md={3}><TextField
          fullWidth={true}
          type="date"
          label="MOU Signed On"
          id="mou_signed"
          name="mou_signed"
          value={formData.mou_signed}
          onChange={handleChange}
          required
        /></Grid>
      <Grid item md={3}>
        <Typography variant="h6">MOU Attachment</Typography>
      </Grid>
      <Grid item md={6}>
        <IPDCAttachFile1 onChange={handleFileChange} />
      </Grid>
            
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-start">
              <Button variant="contained" onClick={prevStep}>
                <Typography color="inherit">Previous</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleSubmission}>
                <Typography color="inherit">Submit</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Step6;
