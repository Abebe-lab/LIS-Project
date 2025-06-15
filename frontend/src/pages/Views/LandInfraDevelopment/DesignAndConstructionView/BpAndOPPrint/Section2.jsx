import React from "react";
import { Typography } from "@mui/material";

const Section2 = ({ decision }) => {
  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: "bold", color: "#000000" }}>
        Decision for the permission:
      </Typography>
      <Typography variant="body1" style={{ color: "#000000" }}>
        {decision}
      </Typography>
    </div>
  );
};

export default Section2;
