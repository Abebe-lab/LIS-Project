/*import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { IPDCDateRangePicker } from "../../../../../components/Controls";

const investmentOptions = [
  "Textile & Apparel",
  "ICT",
  "Pharmaceutical",
  "Agro processing",
  "Construction",
  "Food Products and Beverage",
  "Leather & Leather products",
  "Chemicals",
  "Wood Paper & Furniture",
  "Cement",
  "Motor vehicles",
  "Basic Iron & Steel",
  "Machinery",
  "Plastic & Rubber",
  "Other",
];

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => {
  const getMonthsBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    if (d2.getDate() < d1.getDate()) {
      months--;
    }
    return months <= 0 ? 0 : months;
  };

  const updateContractPeriod = (issueDate, renewalDate) => {
    const period = getMonthsBetween(issueDate, renewalDate);
    handleChange({ target: { name: "contract_period", value: period } });
  };

  const handleIssueDateChange = date => {
    formData.contract_issue = date;
    if (formData.contract_renewal) {
      updateContractPeriod(date, formData.contract_renewal);
    }
    if (!formData.grace_period_ending_date) {
      const gracePeriodMonths = formData.ownership_type === "rent" ? 3 : 18;
      const gracePeriodEndDate = new Date(date);
      gracePeriodEndDate.setMonth(gracePeriodEndDate.getMonth() + gracePeriodMonths);
      formData.grace_period_ending_date = gracePeriodEndDate;
    }
  };

  const handleRenewalDateChange = date => {
    formData.contract_renewal = date;
    if (formData.contract_issue) {
      updateContractPeriod(formData.contract_issue, date);
    }
  };

  const handleHandoverDateChange = newDate => handleChange({ target: { name: "handover_date", value: newDate } });

  const handleProductionCommencementDateChange = newDate => {
    handleChange({ target: { name: "production_commencement_date", value: newDate } });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Step 2: Investment & Contract Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          freeSolo
          options={investmentOptions}
          value={formData.investment_type}
          onChange={(event, newValue) => {
            handleChange({ target: { name: "investment_type", value: newValue } });
          }}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth={true}
              label="Investment Type"
              id="investment_type"
              name="investment_type"
              required
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <IPDCDateRangePicker
          labelFrom="Contract Issue Date"
          labelTo="Contract Renewal Date"
          valueFrom={formData.contract_issue}
          valueTo={formData.contract_renewal}
          onChangeFrom={handleIssueDateChange}
          onChangeTo={handleRenewalDateChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          type="number"
          label="Contract Period in Months"
          id="contract_period"
          name="contract_period"
          value={formData.contract_period}
          onChange={handleChange}
          required
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <IPDCDateRangePicker
          labelFrom="Expected Handover Date"
          labelTo="Expected Production Commencement Date"
          valueFrom={formData.handover_date}
          valueTo={formData.production_commencement_date}
          onChangeFrom={handleHandoverDateChange}
          onChangeTo={handleProductionCommencementDateChange}
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

export default Step2;*/

import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { IPDCDateRangePicker } from "../../../../../components/Controls";
const investmentOptions = [
  "Textile & Apparel",
  "ICT",
  "Pharmaceutical",
  "Agro processing",
  "Construction",
  "Food Products and Beverage",
  "Leather & Leather products",
  "Chemicals",
  "Wood Paper & Furniture",
  "Cement",
  "Motor vehicles",
  "Basic Iron & Steel",
  "Machinery",
  "Plastic & Rubber",
  "Other", //  "Foot Wear, Packaging"
];

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleIssueDateChange = date => {
    formData.contract_issue = date;
    if (!formData.grace_period_ending_date) {
      const gracePeriodMonths = formData.ownership_type === "rent" ? 3 : 18;
      // Calculate grace period ending date
      const gracePeriodEndDate = new Date(date);
      gracePeriodEndDate.setMonth(gracePeriodEndDate.getMonth() + gracePeriodMonths);

      formData.grace_period_ending_date = gracePeriodEndDate;
    }
  };
  const getMonthsBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    if (d2.getDate() < d1.getDate()) {
      months--;
    }
    return months <= 0 ? 0 : months;
  };
  const handleRenewalDateChange = date => {
    formData.contract_renewal = date;
    if (!formData.contract_period || formData.contract_period === "") {
      formData.contract_period = getMonthsBetween(formData.contract_issue, formData.contract_renewal);
      handleChange({ target: { name: "contract_period", value: formData.contract_period } });
    }
  };
  const handleHandoverDateChange = newDate => handleChange({ target: { name: "handover_date", value: newDate } });

  const handleProductionCommencementDateChange = newDate => {
    handleChange({ target: { name: "production_commencement_date", value: newDate } });
    //handleChange({target: {name: "grace"}})
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Step 2: Investment & Contract Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          freeSolo
          options={investmentOptions}
          value={formData.investment_type}
          onChange={(event, newValue) => {
            handleChange({ target: { name: "investment_type", value: newValue } });
          }}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth={true}
              label="Investment Type"
              id="investment_type"
              name="investment_type"
              required
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <IPDCDateRangePicker
          labelFrom="Contract Issue Date"
          labelTo="Contract Renewal Date"
          valueFrom={formData.contract_issue}
          valueTo={formData.contract_renewal}
          onChangeFrom={handleIssueDateChange}
          onChangeTo={handleRenewalDateChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth={true}
          type="number"
          label="Contract Period in Months"
          id="contract_period"
          name="contract_period"
          value={formData.contract_period}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <IPDCDateRangePicker
          labelFrom="Expected Handover Date"
          labelTo="Expected Production Commencement Date"
          valueFrom={formData.handover_date}
          valueTo={formData.production_commencement_date}
          onChangeFrom={handleHandoverDateChange}
          onChangeTo={handleProductionCommencementDateChange}
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

export default Step2;
