import React, { useState, useEffect, useCallback, useRef } from "react";
import { Grid, Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { fromLonLat } from "ol/proj";
import GetControls from "./ShowControlsAndInteractions/GetControls";
import { Interactions, SelectInteraction, ModifyInteraction } from "../Interactions";
import ParkList from "../../../../Shared/PreRenderedComponents/ParkList";
import ShowSpatialFeatureDialog from "../ShowSpatialFeatureDialog";
import { DEFAULT_CENTER } from "../Util/Util";
import DefaultMap from "./DefaultMap";
import MapDataProvider from "../MapData/MapDataProvider";

const categorizedByList = [
  { key: "FUNC", label: "Sector" },
  { key: "OCCUP", label: "Occupancy" },
  { key: "COUNTRY", label: "Country" },
];
const ViewPlanningMap = ({
  isSelectable = true,
  isEditable = false,
  showLegend = true,
  showPopup = true,
  additionalInteraction,
}) => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [dialogKey, setDialogKey] = useState(0);
  const previousFeatureIdRef = useRef(null);

  //for selection change
  useEffect(() => {
    const currentFeatureId = selectedFeature?.[0]?.getId();
    if (currentFeatureId !== previousFeatureIdRef.current) {
      setDialogKey((prevKey) => prevKey + 1);
      previousFeatureIdRef.current = currentFeatureId;
    }
  }, [selectedFeature]);

  const handleGoToPark = useCallback(() => {
    if (selectedPark && selectedPark.center_of_park) {
      const newCenter = fromLonLat(selectedPark.center_of_park.coordinates);
      setCenter(newCenter);
    }
  }, [selectedPark]);
  const controls = <GetControls showLegend={showLegend} />
  
  const interactions = (
    <Interactions>
      {isSelectable && <SelectInteraction setSelectedFeature={setSelectedFeature} showPopup={showPopup} />}
      {isEditable && <ModifyInteraction />}
      {additionalInteraction}
    </Interactions>
  );

  return (
    <>
      <MapDataProvider>
        <Box>
          <Grid container className="no-print" sx={{ width: "50%" }}>
            <Grid item md={6} pr={2}>
              <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button onClick={handleGoToPark} variant="contained" color="primary" fullWidth={true}>
                Go To Park
              </Button>
            </Grid>
          </Grid>
        </Box>

        <DefaultMap
          controls={controls}
          interactions={interactions}
          center={center}
          showPark={true}
          showBlocks={true}
          showParcels={false}
          showInfras={true}
          showGreenAreas={true}
          showPlans={true}
          
        />

        {showPopup && selectedFeature && selectedFeature[0]?.getId() && (
          <ShowSpatialFeatureDialog
            key={dialogKey}
            spatialInfo={selectedFeature[0]?.getProperties()}
            setShowWhenReady={true}
          />
        )}
      </MapDataProvider>
    </>
  );
};

export default ViewPlanningMap;
