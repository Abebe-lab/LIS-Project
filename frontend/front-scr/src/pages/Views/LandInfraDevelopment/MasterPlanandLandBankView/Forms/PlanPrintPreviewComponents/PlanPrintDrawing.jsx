import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { OverviewMapForPrint } from "./OverviewMapForPrint";
import MapDataProvider from "../../../GISView/MapRelated/MapData/MapDataProvider";

export const PlanPrintDrawing = ({ selectedFeature, center,extent }) => {
  return (
    <Container sx={{ border: "2px solid black", width: "100%", height: "100%" }}>
      <MapDataProvider>
        <OverviewMapForPrint
          center={center}
          selectedFeature={selectedFeature}
          closeUp={true}
          extent={extent}
          showMeasurement={true}
        />
      </MapDataProvider>
    </Container>
  );
};
