import React from "react";
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const Step5 = ({ formData, handleChange, nextStep, prevStep }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Step 5: Financial Contractual Details</Typography>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        type="date"
        label="Grace Period Ending Date(Rent/Lease start date)"
        id="grace_period_ending_date"
        name="grace_period_ending_date"
        value={formData.grace_period_ending_date}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth={true}>
        <InputLabel id="payment_mode-label">Payment Method</InputLabel>
        <Select
          labelId="payment_mode-label"
          id="payment_mode"
          name="payment_mode"
          value={formData.payment_mode}
          onChange={handleChange}
          required
        >
          <MenuItem value="usd" selected={true}>
            USD
          </MenuItem>
          <MenuItem value="birr">Birr</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        type="number"
        label="Monthly Rent"
        id="monthly_rent"
        name="monthly_rent"
        value={formData.monthly_rent}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        type="number"
        label="Area as per Contract in m2"
        id="area_as_per_contract_in_m2"
        name="area_as_per_contract_in_m2"
        value={formData.area_as_per_contract_in_m2}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        label="Security Deposit"
        id="security"
        name="security"
        value={formData.security}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth={true}
        type="number"
        label={formData.ownership_type === "lease" ? "Advance Payment" : "Down Payment"}
        id="advance_payment"
        name="advance_payment"
        value={formData.advance_payment}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        type="number"
        fullWidth={true}
        label="Annual Management Service Fee / m2"
        id="annual_mngmnt_service_fee"
        name="annual_mngmnt_service_fee"
        value={formData.annual_mngmnt_service_fee}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={9}>
      <TextField
        fullWidth={true}
        type="number"
        label="Late Charge Fee"
        id="late_charge_fee"
        name="late_charge_fee"
        value={formData.late_charge_fee}
        onChange={handleChange}
        required
      />
    </Grid>
    <Grid item xs={3}>
      <FormControl fullWidth={true}>
        <InputLabel id="penality_rate-label">Rate</InputLabel>
        <Select
          labelId="penality_rate-label"
          id="penality_rate"
          name="penality_rate"
          value={formData.penality_rate}
          onChange={handleChange}
          required
        >
          <MenuItem value="%" selected={true}>
            %
          </MenuItem>
          <MenuItem value="value">value</MenuItem>
        </Select>
      </FormControl>
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

export default Step5;
