import React from 'react';
import { TextField, Typography } from '@mui/material';

const Section4 = ({ dateOfIssue, expireDate }) => {
  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#000000' }}>Date of issue:</Typography>
      <TextField value={dateOfIssue} disabled style={{ fontWeight: 'bold', color: '#000000' }} />
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#000000' }}>Expire date:</Typography>
      <TextField value={expireDate} disabled style={{ fontWeight: 'bold', color: '#000000' }} />
    </div>
  );
};

export default Section4;