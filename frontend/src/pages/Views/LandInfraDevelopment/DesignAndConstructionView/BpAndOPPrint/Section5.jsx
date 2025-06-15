import React from 'react';
import { TextField, Typography } from '@mui/material';

const Section5 = ({ reasons }) => {
  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#000000' }}>Reasons (if not permitted):</Typography>
      <TextField value={reasons} disabled style={{ fontWeight: 'bold', color: '#000000' }} />
    </div>
  );
};

export default Section5;