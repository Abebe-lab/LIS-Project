import React, { useState } from "react";
import {  Box, Grid, Typography } from "@mui/material";
import {CapitalizeWords} from "../utils/Formatting";
import { IpdcTransparentLogo, RightTopMotto } from "../assets/image/print";
const IPDCPrintHeader = ({ title }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <Box sx={{ marginLeft: 0, padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img src={IpdcTransparentLogo} alt="IPDC" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={6} alignContent="center" alignItems={"center"}>
            <Typography variant="h4" component="h2" align="center">
              {CapitalizeWords(title)}
            </Typography>
        </Grid>
        <Grid item xs={3}>
          <img src={RightTopMotto} alt="Strinving for Eco-Industrial Parks Excellence" style={{ width: "100%" }} />
          <Typography variant="body1" alignContent={"right"}>
            Date: <u>{`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}</u>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IPDCPrintHeader;
