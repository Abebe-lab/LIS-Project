import React from "react";
import { Typography, Grid } from "@mui/material";

//prettier-ignore
const rotatedStyle={ fontWeight: "bold", transform: "rotate(180deg)", writingMode: "vertical-rl", 
    textOrientation: "sideways", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", 
    height: "100%", whiteSpace: "wrap", borderColor: "black", borderWidth: 1, borderStyle: "solid", width: "90%" };
export const RotatedCorporationName = () => (
  <>
    <Grid item xs={2} sx={{ ...rotatedStyle }}>
        <Typography variant="subtitle1" >
          INDUSTRIAL PARKS DEVELOPMENT CORPORATION
        </Typography>
    </Grid>
  </>
);
