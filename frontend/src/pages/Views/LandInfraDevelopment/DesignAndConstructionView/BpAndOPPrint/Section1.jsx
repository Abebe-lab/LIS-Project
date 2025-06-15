import React from "react";
import { TextField, Grid } from "@mui/material";

const Section1 = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name of the Industry Park"
          fullWidth={true}
          value={data.nameOfIndustryPark}
          disabled
          style={{ fontWeight: "bold", color: "#000000" }}
        />
      </Grid>
      {/* Add other fields here */}
    </Grid>
  );
};

export default Section1;
