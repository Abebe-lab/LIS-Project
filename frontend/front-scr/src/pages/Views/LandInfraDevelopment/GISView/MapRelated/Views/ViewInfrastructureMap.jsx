import React, { useState, useEffect, useRef } from "react";
import { Button, Grid } from "@mui/material";
import GetControls from "./ShowControlsAndInteractions/GetControls";
import { Interactions, SelectInteraction } from "../Interactions";
import DefaultMap from "./DefaultMap";
import ShowSpatialFeatureDialog from "../ShowSpatialFeatureDialog";
import { DEFAULT_CENTER } from "../Util/Util";

import MapDataProvider from "../MapData/MapDataProvider";
import NavigateToPark from "./NavigateToPark";
import { Forest, ForestOutlined } from "@mui/icons-material";

const ViewInfrastructureMap = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [selectedFeature, setSelectedFeature] = useState(null);
  //for selection change
  const [dialogKey, setDialogKey] = useState(0);
  const previousFeatureIdRef = useRef(null);
  const [showGreenAreas, setShowGreenAreas] = useState(false);

  useEffect(() => {
    const currentFeatureId = selectedFeature?.[0]?.getId();
    if (currentFeatureId !== previousFeatureIdRef.current) {
      setDialogKey(prevKey => prevKey + 1);
      previousFeatureIdRef.current = currentFeatureId;
    }
  }, [selectedFeature]);

  const controls = <GetControls />;
  const interactions = (
    <Interactions>{<SelectInteraction setSelectedFeature={setSelectedFeature} showPopup={true} />}</Interactions>
  );

  return (
    <>
      <MapDataProvider>
        <Grid container>
          <Grid item xs={6}>
            <NavigateToPark center={center} setCenter={setCenter} />
          </Grid>
          <Grid item xs={6} alignContent={"center"} sx={{ display: "flex", justifyContent: "right" }}>
            <Button id="showGreen" onClick={e => setShowGreenAreas(!showGreenAreas)} variant="contained" startIcon={<ForestOutlined/>} >
              Green Areas
            </Button>
          </Grid>
        </Grid>

        <DefaultMap
          controls={controls}
          interactions={interactions}
          additionalLayers={[]}
          center={center}
          showPark={true}
          showInfras={true}
          showGreenAreas={showGreenAreas}
          showRoads={true}
          showGCPS={true}
          showWasteDisposals={true}
          showWaters={true}
          showPowers={true}
          showCommunications={true}
          showOtherInfras={true}
          showStorages={true}
          showSurveyDatas={false}
          showBlocks={false}
          showParcels={false}
          showBuildings={false}
          showImporteds={false}
        />

        {selectedFeature && selectedFeature[0]?.getId() && (
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

export default ViewInfrastructureMap;
