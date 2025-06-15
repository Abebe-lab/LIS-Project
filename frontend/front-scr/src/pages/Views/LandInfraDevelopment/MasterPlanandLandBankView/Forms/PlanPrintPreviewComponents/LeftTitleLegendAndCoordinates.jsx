import React from "react";
import { Grid, Typography, Box } from "@mui/material";
//prettier-ignore
import { coordinateStyle, greenBorderWithCenterContent, greenBorderOnly, alignContentToCenterVertically, } from "./PlanPrintStyles";
import { fromLonLat } from "ol/proj";

// Helper component for common box structure
const InfoBox = ({ title, content, variant = "body2", isBold = false, underline = false, textColor = "black" }) => (
  <Box>
    <Typography variant={variant} sx={{ fontWeight: isBold ? "bold" : "normal" }} color={textColor}>
      {title}
      {underline && (
        <Typography sx={{ textDecoration: "underline" }} display="inline" color={textColor}>
          {content}
        </Typography>
      )}
      {!underline && content}
    </Typography>
  </Box>
);

// Helper for coordinate list
const CoordinateList = ({ coordinates }) =>
  coordinates.map((coord, index) => {
    const converted = fromLonLat(coord);
    return (
      <Typography key={index} variant="body2" sx={{ fontSize: "10px", color: "black" }}>
        {index + 1}: X={parseFloat(converted[0])?.toFixed(4)}, Y={parseFloat(converted[1])?.toFixed(4)}
      </Typography>
    );
  });

export const LeftTitleLegendAndCoordinates = ({ selectedPark, feature, companyName }) => {
  const { address, name } = selectedPark || {};
  const coordinates = feature?.geometry?.coordinates?.[0] || [];

  return (
    <>
      <Grid container sx={{ height: "25%" }}>
        <Grid
          item
          xs={12}
          sx={{
            ...greenBorderWithCenterContent,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InfoBox title="LOCATION REGION - " content={address?.toUpperCase() || "Not Stated"} isBold />
          <InfoBox title="NAME: " content={name?.toUpperCase() || "Not Stated"} underline textColor="green" />
          <InfoBox title={companyName} isBold />
        </Grid>
      </Grid>
      <Grid container sx={{ height: "75%" }}>
        <Grid container sx={{ ...greenBorderOnly, marginTop: 1 , py: 1}}>
          <Grid item xs={5} sx={{ ...alignContentToCenterVertically, borderRight: "1px solid grey" }}>
            <InfoBox title="N" variant="h3" isBold />
            <InfoBox title="LEGEND" isBold />            
            <InfoBox title={<> <span style={{ 
          display: 'inline-block', 
          width: '10px', 
          height: '10px', 
          border: '2px solid #5E67AF',
          marginRight: '5px' 
        }}></span>{companyName}</>} />
            <InfoBox title="UPIN " content={feature?.upin} isBold underline />
          </Grid>
          <Grid item xs={7} sx={{ ...coordinateStyle, gap: 1, paddingY: 1 }}>
            <InfoBox title="COORDINATE" isBold />
            <Box >
            {coordinates.length > 0 && <CoordinateList coordinates={coordinates.slice(0, -1)} />}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
