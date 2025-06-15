import React from 'react';
import { Checkbox, Typography } from '@mui/material';

const Section6 = ({ relevantDocuments }) => {
  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#000000' }}>Relevant approved document attached with:</Typography>
      <Checkbox checked={relevantDocuments.architectural} label="Architectural" style={{ color: '#000000' }} />
      {/* Add other checkboxes */}
    </div>
  );
};

export default Section6;