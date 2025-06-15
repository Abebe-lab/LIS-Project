import React from "react";
import { Box, Typography, Grid } from "@mui/material";

// Title Component
const TitleSection = ({ agreementDetail }) => (
  <Box sx={{ textAlign: "left" }}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body2">የንዑስ ሊዝ ባለይዞታው/ዎቹ ስም ከነአያት</Typography>
        <Typography variant="body2">Possessor's Full Name: </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" sx={{ textDecoration: "underline" }}>{agreementDetail.company_name}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2">የካርታ ቁጥር </Typography>
        <Typography variant="body2">TitleDeed No <Typography variant="body2" sx={{ textDecoration: "underline" }} display="inline">{agreementDetail.upin}</Typography></Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2">የመዝገብ ቁጥር </Typography>
        <Typography variant="body2">Registration Book No. <Typography variant="body2" sx={{ textDecoration: "underline" }} display="inline">{agreementDetail.id}</Typography></Typography>
      </Grid>

      <Grid item xs={6} md={6}>
        <Typography variant="body2">ቀን:</Typography>
        <Typography variant="body2">
          Date Issued.{" "}<Typography variant="body2" sx={{ textDecoration: "underline" }} display="inline">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</Typography>
        </Typography>
      </Grid>

      <Grid item xs={6} md={6}>
        <Typography variant="body2">የምዝገባ ተ.ቁ.</Typography>
        <Typography variant="body2">Registration No. {agreementDetail.id}</Typography>
      </Grid>
    </Grid>
  </Box>
);

export default TitleSection;
