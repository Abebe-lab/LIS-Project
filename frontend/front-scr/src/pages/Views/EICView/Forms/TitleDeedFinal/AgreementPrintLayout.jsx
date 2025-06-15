import React from "react";
import { Box } from "@mui/material";
import TitleSection from "./TitleSection";
import MapSection from "./MapSection";
import AgreementDetailsSection from "./AgreementDetailSection";
import SignatureSection from "./SignatureSection";

const AgreementPrintLayout = React.forwardRef(({ agreementDetail, spatialInfo }, ref) => (
  <Box
    ref={ref}
    sx={{
      width: "210mm",
      height: "297mm",
      padding: "10mm",
      backgroundColor: "white",
      border: "1px solid black",
      display: "flex",
      flexDirection: "column",
    }}
    gap={2}
  >
    {/* Title Section - Takes up exactly 16% of the height */}
    <Box sx={{ height: '16%', border: "1px solid black", p: 2 }}>
      <TitleSection agreementDetail={agreementDetail} />
    </Box>

    {/* Map Section - Takes up exactly 50% of the height */}
    <Box sx={{ height: '50%' }}>
      <MapSection spatialInfo={spatialInfo} />
    </Box>

    {/* Agreement Details Section - Takes up exactly 15% of the height */}
    <Box sx={{ height: '15%' }}>
      <AgreementDetailsSection agreementDetail={agreementDetail} />
    </Box>

    {/* Signature Section - Takes up exactly 19% of the height */}
    <Box sx={{ height: '19%' }}>
      <SignatureSection />
    </Box>
  </Box>
));

export default AgreementPrintLayout;