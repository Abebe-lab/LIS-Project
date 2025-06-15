import React from "react";
import { Typography, Box } from "@mui/material";
import { NumberWithCommas } from "../../../../../../utils/Formatting";

export const RightTop = ({ investorName, feature }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1,paddingLeft:2,paddingRight:2 }}>
    <Typography variant="h6" fontWeight="bold">
      Name:{" "}
      <Typography sx={{ textDecoration: "underline" }} display="inline">
        {investorName}
      </Typography>
    </Typography>
    <Typography variant="h6" fontWeight="bold">
      Area:{" "}
      <Typography sx={{ textDecoration: "underline" }} display="inline">
        {NumberWithCommas(feature.measured_area) || ""} m²
      </Typography>
    </Typography>
  </Box>
);
