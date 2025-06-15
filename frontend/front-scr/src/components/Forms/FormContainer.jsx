import React from "react";
import { Box, Button, Grid, Paper, FormControl, Container, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import IPDCFormHeader from "./IPDCFormHeader";
//prettier-ignore
const FormWrapper = styled(Paper)(({ theme }) => (
  {padding: theme.spacing(3), width: "100%", maxWidth: 800, margin: "0 auto"}
));
//prettier-ignore
const FormContainer = ({ title, children, onSubmit, showButton = true, buttonLabel = "Submit", showTitle = true, extraInfoAfterButton = null }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ width: "100%", height: isSmallScreen ? "auto" : "60%", alignItems: "center", mt: 1 }} >
      <FormWrapper elevation={3}>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={1}>
            {showTitle && <Grid item xs={12}><IPDCFormHeader title={title} /></Grid>}
            {children}
            {showButton && (
              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <Button variant="contained" color="primary" type="submit">{buttonLabel}</Button>
                </FormControl>
              </Grid>
            )}
            {extraInfoAfterButton &&  <Grid item xs={12}>{extraInfoAfterButton}</Grid>}
          </Grid>
        </Box>
      </FormWrapper>
    </Container>
  );
};

export default FormContainer;
