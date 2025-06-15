import React from "react";
import {  Box, Grid } from "@mui/material";
import { ButtomReport } from "../assets/image/print";
const IPDCPrintButtom = () => {

  return (
    <Box sx={{ marginLeft: 0, padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src={ButtomReport} alt="IPDC info" style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IPDCPrintButtom;
