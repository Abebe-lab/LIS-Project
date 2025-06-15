import React from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";

const Step4 = ({ formData, handleChange, nextStep, prevStep }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Step 4: Market & Disposal</Typography>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        label="Market Destination"
        id="market_destination"
        name="market_destination"
        value={formData.market_destination}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        label="Link to International Brands"
        id="intl_brands_link"
        name="intl_brands_link"
        value={formData.intl_brands_link}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        label="Waste Disposal Method"
        id="disposal_method"
        name="disposal_method"
        value={formData.disposal_method}
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

export default Step4;
