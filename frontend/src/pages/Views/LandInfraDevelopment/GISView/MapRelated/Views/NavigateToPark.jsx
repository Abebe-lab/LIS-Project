import React, { useState, useCallback, useEffect } from "react";
import {  Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fromLonLat } from "ol/proj";

import ParkList from "../../../../Shared/PreRenderedComponents/ParkList";

export default function NavigateToPark({ center, setCenter,showImageOnly=false }) {
  const [selectedPark, setSelectedPark] = useState(null);
  useEffect(() => {
    const storedCenter = localStorage.getItem('mapCenter');
    if (storedCenter) {
      const [lon, lat] = JSON.parse(storedCenter);
      setCenter(fromLonLat([lon, lat]));
    }
  }, [setCenter]);
  
  const handleGoToPark = useCallback(() => {
    if (selectedPark && selectedPark.center_of_park) {
      const newCenter = fromLonLat(selectedPark.center_of_park.coordinates);
      setCenter(newCenter);
      localStorage.setItem('mapCenter', JSON.stringify(selectedPark.center_of_park.coordinates));
      console.log("[center changed in navigate to park]", newCenter);
    }
  }, [selectedPark, setCenter]);

  return (
    <>
      <Grid container className="no-print" spacing={1}>
        <Grid item xs={7} md={7}>
          <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
        </Grid>
        <Grid item xs={showImageOnly ? 5: 1} md={showImageOnly ? 5: 1} alignContent={"center"} sx={{ display: "flex", justifyContent: "center" }}>
          <Button endIcon={<ArrowForwardIcon />} onClick={handleGoToPark} variant="contained" color="primary" fullWidth={true}>
           {showImageOnly && "Go To Park"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
