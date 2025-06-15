import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { TitledeedBody, TitledeedFooter, TitledeedHeader } from "./TitledeedComponents";
export const TitledeedPreview = ({ agreementInfo, featureInfo }) => {
  useEffect(()=>{
console.log("agreementInfo : ",agreementInfo);
console.log("featureInfo : ",featureInfo);
  },[agreementInfo, featureInfo]);
  return (
    <Container>
      <Grid container sx={{ height: "100%", width: "100%" }}>
        <Grid item xs={12} sx={{height: '20%'}}>
          <TitledeedHeader />
        </Grid>
        <Grid item xs={12}>
          <TitledeedBody />
        </Grid>
        <Grid item xs={12} sx={{height: '20%'}}>
          <TitledeedFooter />
        </Grid>
      </Grid>
    </Container>
  );
};
