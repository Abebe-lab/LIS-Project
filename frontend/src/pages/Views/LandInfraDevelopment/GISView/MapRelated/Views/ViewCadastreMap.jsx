import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { Interactions, SelectInteraction, ModifyInteraction } from "../Interactions";
import DefaultMap from "./DefaultMap";

import ShowSpatialFeatureDialog from "../ShowSpatialFeatureDialog";
import { DEFAULT_CENTER } from "../Util/Util";
import NavigateToPark from "./NavigateToPark";
import MapDataProvider from "../MapData/MapDataProvider";
import GetControls from "./ShowControlsAndInteractions/GetControls";
//prettier-ignore
const ViewCadastreMap = ({  isSelectable = true,  isEditable = false,  showLegend = true,  
                        showPopup = true,   additionalInteraction}) => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const [dialogKey, setDialogKey] = useState(0);
  const previousFeatureIdRef = useRef(null);
  useEffect(() => {
    const currentFeatureId = selectedFeature?.[0]?.getId();
    if (currentFeatureId !== previousFeatureIdRef.current) {
      setDialogKey((prevKey) => prevKey + 1);
      previousFeatureIdRef.current = currentFeatureId;
    }
  }, [selectedFeature]);

  const controls = <GetControls showLegend={showLegend} />;

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
      <Grid container >
          <Grid xs={6}>
        <NavigateToPark center={center} setCenter={setCenter} /></Grid>
        </Grid>
        <DefaultMap
          controls={controls}
          interactions={interactions}
          center={center}
          showPark={true}
          showBlocks={true}
          showParcels={true}
          showSheds={true}
          showRoads={true}
          showGreenAreas={false}
          isEditable={false}
          showSateliteImage={false}
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

export default ViewCadastreMap;
