import React from "react";
import {  Typography, Grid } from "@mui/material";

export const LeftButtomDescription = () => (
    <>
    <Grid item xs={3}>
      <Typography fontWeight="bold" variant="body2" textAlign="center">SITE LOCATION</Typography>
    </Grid>
    <Grid item xs={9} alignContent="center" alignItems="center" display="flex" flexDirection="column">
      <Typography fontWeight="bold" variant="body2">INTERNAL USE ONLY</Typography>
    </Grid>
    </>
);