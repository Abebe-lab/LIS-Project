import React, { useState, useEffect, useRef } from "react";
import { ToggleButton, ToggleButtonGroup, Grid, Checkbox, FormControlLabel } from "@mui/material";
import SatelliteIcon from "@mui/icons-material/SatelliteAltRounded";
import DirectionsOffIcon from "@mui/icons-material/DirectionsOff";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterListIcon from "@mui/icons-material/FilterList";
import { pink } from "@mui/material/colors";
import { Interactions, SelectInteraction } from "../Interactions";

import ShowSpatialFeatureDialog from "../ShowSpatialFeatureDialog";

import { DEFAULT_CENTER } from "../Util/Util";
import MapDataProvider from "../MapData/MapDataProvider";

import NavigateToPark from "./NavigateToPark";
import DefaultMap from "./DefaultMap";
import GetControls from "./ShowControlsAndInteractions/GetControls";

const categorizedByList = [
  { key: "FUNC", label: "Sector" },
  { key: "OCCUP", label: "Occupancy" },
  { key: "COUNTRY", label: "Country" },
];
const ViewMapByCategoryPage = () => {
  const showPopup = true;
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categorizedByList[1].key);
  const [dialogKey, setDialogKey] = useState(0);
  const previousFeatureIdRef = useRef(null);

  const [showLegend, setShowLegend] = useState(false);
  const [showSateliteImage, setShowSateliteImage] = useState(false);
  //for selection change
  useEffect(() => {
    const currentFeatureId = selectedFeature?.[0]?.getId();
    if (currentFeatureId !== previousFeatureIdRef.current) {
      setDialogKey(prevKey => prevKey + 1);
      previousFeatureIdRef.current = currentFeatureId;
    }
  }, [selectedFeature]);

  const controls = <GetControls showLegend={showLegend} />;

  const interactions = (
    <Interactions>
      <SelectInteraction setSelectedFeature={setSelectedFeature} showPopup={true} />
    </Interactions>
  );
  const handleLegendToggle = () => setShowLegend(!showLegend);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5} md={5}>
          <NavigateToPark center={center} setCenter={setCenter} />
        </Grid>
        <Grid item xs={4} md={4} alignContent={"center"} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showLegend}
                onChange={handleLegendToggle}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                icon={<FilterListOffIcon />}
                checkedIcon={<FilterListIcon />}
              />
            }
            label={showLegend ? "Hide Legend" : "Show Legend"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showSateliteImage}
                onChange={e => setShowSateliteImage(e.target.checked)}
                checkedIcon={<SatelliteIcon />}
                icon={<DirectionsOffIcon />}
                color="success"
              />
            }
            label={showSateliteImage ? "Hide Satellite Image" : "Show Satellite Image"}
          />
        </Grid>
        <Grid item xs={3} md={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ToggleButtonGroup value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} exclusive>
            {categorizedByList.map(item => (
              <ToggleButton key={item.key} value={item.key}>
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <MapDataProvider>
        <DefaultMap
          controls={controls}
          interactions={interactions}
          center={center}
          showPark={true}
          showBlocks={true}
          showParcels={true}
          showInfras={true}
          showGreenAreas={true}
          parcelsCategory={selectedCategory}
          showSateliteImage={showSateliteImage}
        />
      </MapDataProvider>
      {showPopup && selectedFeature && selectedFeature[0]?.getId() && (
        <ShowSpatialFeatureDialog
          key={dialogKey}
          spatialInfo={selectedFeature[0]?.getProperties()}
          setShowWhenReady={true}
        />
      )}
    </>
  );
};

export default ViewMapByCategoryPage;
