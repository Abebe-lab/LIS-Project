import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';

const IPDCDateRangePicker = ({ labelFrom, labelTo, valueFrom, valueTo, onChangeFrom, onChangeTo, minDate }) => {
  const [fromDate, setFromDate] = useState(valueFrom);
  const [toDate, setToDate] = useState(valueTo);
  const [error, setError] = useState('');

  const handleFromDateChange = (event) => {
    const newDate = event.target.value;
    setFromDate(newDate);
    onChangeFrom(newDate);

    // Clear error if `toDate` is valid after `fromDate` change
    if (toDate && toDate >= newDate) {
      setError('');
    }
  };

  const handleToDateChange = (event) => {
    const newDate = event.target.value;
    setToDate(newDate);
    onChangeTo(newDate);
  };

  const handleToDateBlur = () => {
    // Validate mismatch on blur (input leave)
    if (toDate < (fromDate || minDate)) {
      setError(`The ${labelTo} cannot be earlier than ${fromDate || minDate}`);
      setToDate(fromDate || minDate); // Reset to the minimum valid date
      onChangeTo(fromDate || minDate);
    } else {
      setError('');
    }
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="date"
          label={labelFrom}
          value={fromDate}
          onChange={handleFromDateChange}
          InputLabelProps={{ shrink: true }}
          min={minDate}
        />
      </Grid>
      <Grid item xs={6}>
      <TextField
          fullWidth
          type="date"
          label={labelTo}
          value={toDate}
          onChange={handleToDateChange}
          onBlur={handleToDateBlur} 
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: fromDate || minDate }}
          error={!!error} // Display error style when there's an error
          helperText={error} // Show error message under the field
        />
      </Grid>
      {/*error && (
        <Grid item xs={12}>
          <Typography color="error">{error}</Typography>
        </Grid>
      )*/}
    </Grid>
  );
};

export default IPDCDateRangePicker;