import React, { useEffect, useState } from "react";
import { Box, Paper, Dialog, DialogContent, Button, DialogActions, Grid } from "@mui/material";
import { Print as PrintIcon, Close as ExitToAppIcon } from "@mui/icons-material";
import { GetParks } from "../../../Shared/CommonData/CommonData";
import { PlanPrintDrawing } from "./PlanPrintPreviewComponents/PlanPrintDrawing";
//prettier-ignore
import { LeftTitleLegendAndCoordinates, RotatedCorporationName, LeftButtomDescription, RightButtom, OverviewMapForPrint, } from "./PlanPrintPreviewComponents";

import { greenBorderOnly } from "./PlanPrintPreviewComponents/PlanPrintStyles";
import MapDataProvider from "../../GISView/MapRelated/MapData/MapDataProvider";
import { RightTop } from "./PlanPrintPreviewComponents/RightTop";
import { fromLonLat } from "ol/proj";
import { DEFAULT_CENTER, getExtentFromFeature } from "../../GISView/MapRelated/Util/Util";
const PlanPrintPreview = ({ feature, investorName, open, onClose, onPrint }) => {
  const [parkInfo, setParkInfo] = useState([]);
  const [extent, setExtent] = useState(null);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  //const [filteredParcels,setFilteredParcels]=useState(null);
  useEffect(() => {
    if (feature) {
      console.log("Coordinates : ", feature.geometry.coordinates[0][0]);
      const calculatedExtent = getExtentFromFeature(feature);
      console.log("Calculated extent: ", calculatedExtent);
      setExtent(calculatedExtent);

      if (calculatedExtent) {
        // Calculate the center of the feature based on the extent
        const [minX, minY, maxX, maxY] = calculatedExtent;
        setCenter(fromLonLat([(minX + maxX) / 2, (minY + maxY) / 2]));
      }
    }
  }, [feature]);

  useEffect(() => {
    const fetchParkInfo = async () => {
      try {
        const parks = await GetParks();
        const selectedPark = parks.find(park => park.id === feature.park_id);
        //        console.log("Selected park : ", selectedPark);
        setParkInfo(selectedPark);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParkInfo();
  }, [feature, investorName]);

  const dimensions = [
    { label: "133m", style: { top: "10%", left: "50%" } },
    { label: "100m", style: { top: "50%", left: "95%" } },
    { label: "115m", style: { top: "90%", left: "50%" } },
    { label: "118m", style: { top: "50%", left: "5%" } },
    { label: "R15m", style: { bottom: "10%", right: "10%" } },
  ];
  useEffect(() => {
    // Add print media query for landscape orientation
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        @page { size: A4 landscape; margin: 0; }
        body, html, .MuiDialogContent-root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .MuiPaper-root {
          width: 100%;
          height: 100%;
          border: none;
        }
        canvas, img, svg {
          max-width: 100%;
          max-height: 100%;
        }
        .MuiDialogActions-root {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const handlePrintAndSave = () => {
    try {
      onPrint();
      // Adjust layout for printing
      const dialogActions = document.querySelector(".MuiDialogActions-root");
      if (dialogActions) {
        const originalDisplay = dialogActions.style.display;
        const originalPosition = dialogActions.style.position;

        dialogActions.style.display = "none";
        dialogActions.style.position = "absolute";

        // Print
        window.print();

        // Reset styles
        dialogActions.style.display = originalDisplay;
        dialogActions.style.position = originalPosition;
      } else {
        window.print(); // If dialog actions not found, proceed with print
      }

      onClose(); // Close the dialog after printing
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="lg">
      <DialogContent>
        <Paper elevation={3} sx={{ ...greenBorderOnly }}>
          {/* backgroundColor: "#f5f5f5" }}>*/}
          <Box sx={{ width: "100%", aspectRatio: "16 / 9", display: "flex", flexDirection: "row" }}>
            {/* Left Top*/}
            <Box sx={{ width: "42%", height: "100%", display: "flex", flexDirection: "column", paddingRight: 1 }}>
              <Grid container sx={{ width: "100%", height: "50%" }}>
                <RotatedCorporationName />
                <Grid xs={10} sx={{ paddingLeft: 1, paddingTop: 1 }}>
                  <LeftTitleLegendAndCoordinates selectedPark={parkInfo} feature={feature} companyName={investorName} />
                </Grid>
              </Grid>
              {/* Left Bottom */}
              <Grid container sx={{ height: "50%" }}>
                <Box
                  sx={{
                    alignContent: "center",
                    alignSelf: "center",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <LeftButtomDescription />
                </Box>
                <Grid xs={12} sx={{ ...greenBorderOnly, height: "80%", position: "relative" }}>
                  <MapDataProvider>
                    <OverviewMapForPrint selectedFeature={feature} closeUp={false} center={center} />
                  </MapDataProvider>
                </Grid>
              </Grid>
            </Box>
            {/* Right Section */}
            <Box sx={{ width: "58%", display: "flex", flexDirection: "column", zIndex: 1000000000 }}>
              <RightTop investorName={investorName} feature={feature} />
              {<PlanPrintDrawing dimensions={dimensions} selectedFeature={feature} center={center} extent={extent} />}
              <RightButtom />
            </Box>
          </Box>
        </Paper>
      </DialogContent>
      <DialogActions className="no-print">
        <Button startIcon={<ExitToAppIcon sx={{ fill: "red" }} />} variant="outlined" color="error" onClick={onClose}>
          Close
        </Button>
        <Button variant="outlined" onClick={handlePrintAndSave} startIcon={<PrintIcon />}>
          Save & Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanPrintPreview;
