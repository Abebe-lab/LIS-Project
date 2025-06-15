import React from "react";
import { Typography, Grid } from "@mui/material";
import { CoordinatesToTable } from "../../../LandInfraDevelopment/GISView/MapRelated/Util/CoordinatesToTable";
import MapDataProvider from "../../../LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import { OverviewMapForPrint } from "../../../LandInfraDevelopment/MasterPlanandLandBankView/Forms/PlanPrintPreviewComponents";
import { getCenterFromFeature, getExtentFromFeature } from "../../../LandInfraDevelopment/GISView/MapRelated/Util/Util";

const borderStyle = {
  border: "1px solid black",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // Changed from 'right' to 'flex-start'
  alignItems: "flex-start", // Changed from 'right' to 'flex-start'
  height: "100%",
  marginLeft: 2,
};

const MapSection = ({ spatialInfo }) => {
  console.log("Map section spatial info: ", spatialInfo);
  return (
    <Grid container spacing={2} sx={{ mt: 2, height: "100%" }}>
      <Grid item xs={7} sx={{ ...borderStyle }}>
        <Grid container direction="column" spacing={0} sx={{ height: "100%" }}>
          <Grid item style={{ height: "10%" }}>
            <Typography variant="body" sx={{ textDecoration: "underline", minHeight: "100%" }}>
              የቦታው አቀማመጥ
            </Typography>
          </Grid>
          <Grid item style={{ height: "80%" }}>
            {spatialInfo ? (
              <MapDataProvider>
                <OverviewMapForPrint
                  selectedFeature={spatialInfo}
                  closeUp={true}
                  extent={getExtentFromFeature(spatialInfo)}
                  center={getCenterFromFeature(spatialInfo)}
                  showMeasurement={true}
                />
              </MapDataProvider>
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }}>No spatial data</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {spatialInfo ? (
          <CoordinatesToTable
            coordinates={spatialInfo.geometry.coordinates[0]}
            projected={true}
            withTitle={true}
            showIndexNo={false}
            maxHeight="400px"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }} />
        )}
      </Grid>
    </Grid>
  );
};

export default MapSection;
