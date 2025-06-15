import React from 'react';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '32px',
  },
  
  '& .MuiInputLabel-root': {
    transform: 'translate(14px, 13px) scale(1)',
    '&.Mui-focused, &.MuiFormLabel-filled': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
  },
});

const IPDCStylizedTextField = (props) => {
  return <StyledTextField {...props} />;
};

export default IPDCStylizedTextField;