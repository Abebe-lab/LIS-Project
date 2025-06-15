import React from 'react';
import { TextField , Typography} from '@mui/material';

const Section7 = ({ checkedBy, certifiedBy, approvedBy }) => {
  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#000000' }}>Approved persons</Typography>
      <TextField label="Checked by" value={checkedBy} disabled style={{ fontWeight: 'bold', color: '#000000' }} />
      <TextField label="Certified by" value={certifiedBy} disabled style={{ fontWeight: 'bold', color: '#000000' }} />
      <TextField label="Approved by" value={approvedBy} disabled style={{ fontWeight: 'bold', color: '#000000' }} />
    </div>
  );
};

export default Section7;