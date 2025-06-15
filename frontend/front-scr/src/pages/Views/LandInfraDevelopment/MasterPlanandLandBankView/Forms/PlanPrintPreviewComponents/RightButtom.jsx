import React from "react";
import {  Typography, Grid } from "@mui/material";

export const RightButtom = () => (
  <Grid container sx={{ alignContent: "center", alignItems: "center", flexDirection: "row", padding: 2}}>
    <Grid item xs={6}>
      <Typography variant="body2">Scale: <Typography sx={{ textDecoration: "underline" }} display="inline">___TO FIT___</Typography></Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2">Sheet no: <Typography sx={{ textDecoration: "underline" }} display="inline">____1_____</Typography></Typography>
    </Grid>
  </Grid>
);