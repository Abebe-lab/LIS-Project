import React from "react";
import { Typography } from "@mui/material";
import { EmblemOfEthiopia, IpdcTransparentLogo } from "../../../../../assets/image/print";

const Header = ({ date, serialNo }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", color: "#000000" }}>
        THE FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
      </Typography>
      <Typography variant="h6" style={{ fontWeight: "bold", color: "#000000" }}>
        INDUSTRIAL PARKS DEVELOPMENT CORPORATION (IPDC)
      </Typography>
      <Typography variant="body1" style={{ color: "#000000" }}>
        Date:
      </Typography>
      <Typography variant="body1" style={{ color: "#000000" }}>
        {date}
      </Typography>
      <Typography variant="body1" style={{ color: "#000000" }}>
        Serial No:
      </Typography>
      <Typography variant="body1" style={{ color: "#000000" }}>
        {serialNo}
      </Typography>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#000000" }}>
        BUILDING PERMISSION CERTIFICATE
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <img src={EmblemOfEthiopia} alt="Emblem 1" style={{ width: "100px", height: "100px" }} />
        <img src={IpdcTransparentLogo} alt="Emblem 2" style={{ width: "100px", height: "100px" }} />
      </div>
    </div>
  );
};

export default Header;
