// TwoColumnFormContainer.jsx
import React from 'react';
import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const FormHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const TwoColumnFormContainer = ({ title, children, onSubmit, float }) => {
  const getPositionStyles = () => {
    switch (float) {
      case 'left':
        return { alignItems: 'flex-start' };
      case 'right':
        return { alignItems: 'flex-end' };
      default:
        return { alignItems: 'center' };
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      sx={getPositionStyles()}
    >
      <FormWrapper>
        <FormHeader variant="h6">{title}</FormHeader>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {children}
          </Grid>
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </FormWrapper>
    </Box>
  );
};

export default TwoColumnFormContainer;