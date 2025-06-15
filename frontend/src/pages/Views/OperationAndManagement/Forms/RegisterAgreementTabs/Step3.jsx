import React from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
//import { IPDCDateRangePicker } from "../../../../../components/Controls";

const Step3 = ({ formData, handleChange, nextStep, prevStep }) => {
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Step 3: Production, Conditions and Capacity</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          type="number"
          label="Production Capacity"
          id="production_capacity"
          name="production_capacity"
          value={formData.production_capacity}
          onChange={handleChange}
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          type="number"
          label="Export Capacity"
          id="export_capacity"
          name="export_capacity"
          value={formData.export_capacity}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          type="number"
          label="Employment Capacity"
          id="employee_capacity"
          name="employee_capacity"
          value={formData.employee_capacity}
          onChange={handleChange}
          required
        />
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
              <Button variant="contained" onClick={nextStep}>
                <Typography color="inherit">Next</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Step3;
