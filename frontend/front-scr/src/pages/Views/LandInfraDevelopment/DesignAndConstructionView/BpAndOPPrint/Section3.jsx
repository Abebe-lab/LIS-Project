import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

const Section3 = ({ permitted, handleChange }) => {
  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#000000' }}>After checking the document presented, the construction is:</Typography>
      <RadioGroup
        value={permitted}
        onChange={handleChange}
      >
        <FormControlLabel value="Permitted" control={<Radio />} label="Permitted" style={{ color: '#000000' }} />
        <FormControlLabel value="Not Permitted" control={<Radio />} label="Not Permitted" style={{ color: '#000000' }} />
      </RadioGroup>
    </div>
  );
};

export default Section3;