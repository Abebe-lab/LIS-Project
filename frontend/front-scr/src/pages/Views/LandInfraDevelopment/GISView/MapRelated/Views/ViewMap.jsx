import React, { useState, useEffect, useRef, Fragment } from "react";
import { Grid, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import {Straighten as RulerIcon, SquareFoot as SquareFootIcon} from "@mui/icons-material";

import NavigateToPark from "./NavigateToPark";
import DefaultMap from "./DefaultMap";
import MapDataProvider from "../MapData/MapDataProvider";
import ShowSpatialFeatureDialog from "../ShowSpatialFeatureDialog";

import { DEFAULT_CENTER } from "../Util/Util";

import GetControls from "./ShowControlsAndInteractions/GetControls";
import GetInteractions from "./ShowControlsAndInteractions/GetInteractions";

import { Vector as VectorSource } from "ol/source";
import { VectorLayer } from "../Layers";
import { DrawInteraction } from "../Interactions";

import { getNonParcelFeatureStyle } from "../Style/NonParcelStyler";

//prettier-ignore
const ViewMap = ({ isSelectable = true, isEditable = false, showLegend = true, showPopup = true,
  additionalLayers = [], additionalInteraction, setSelectedFeatureOnMap, showSateliteImage = true }) => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const [dialogKey, setDialogKey] = useState(0);
  const previousFeatureIdRef = useRef(null);
  const [measurement, setMeasurement] = useState({ value: 0, unitOfMeasure: null }); // Change type to unitOfMeasure
  const [drawType, setDrawType] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [measurementSource] = useState(new VectorSource());

  useEffect(() => {
    const currentFeatureId = selectedFeature?.[0]?.getId();
    if (currentFeatureId !== previousFeatureIdRef.current) {
      setDialogKey(prevKey => prevKey + 1);
      previousFeatureIdRef.current = currentFeatureId;
    }
    if (selectedFeature && setSelectedFeatureOnMap) setSelectedFeatureOnMap(selectedFeature);
  }, [selectedFeature]);

  const controls = <GetControls showLegend={showLegend} />;

  const measureCallback = (measurement, type) => {
    setMeasurement({
      value: measurement,
      unitOfMeasure: type === "LineString" ? "m" : "m²",
    });
  };

  const interactions = (
    <GetInteractions
      isSelectable={isSelectable}
      isEditable={isEditable}
      setSelectedFeature={setSelectedFeature}
      showPopup={showPopup}
      additionalInteraction={
        <>
          {additionalInteraction}
          {drawType && (
            <DrawInteraction
              source={measurementSource}
              type={drawType}
              onMeasurement={measureCallback}
              setDrawType={setDrawType}
              setIsDrawing={isDrawing => setIsDrawing(isDrawing)}
            />
          )}
        </>
      }
    />
  );

  const handleMeasurementTypeChange = (event, newType) => {
    setDrawType(newType);
    setMeasurement({ value: 0, unitOfMeasure: null });
  };
  const safeAdditionalLayers = Array.isArray(additionalLayers) ? additionalLayers : [additionalLayers];

  return (
    <>
      <MapDataProvider>
        <Grid container sx={{ alignContent: "center", alignItems: "center" }}>
          <Grid item xs={4}>
            <NavigateToPark center={center} setCenter={setCenter} />
          </Grid>
          <Grid item xs={2} sx={{ px: 2 }}>
            <ToggleButtonGroup exclusive onChange={handleMeasurementTypeChange} value={drawType}>
              <Tooltip title="Measure Length (Use right click)">
                <ToggleButton value="LineString">
                  <RulerIcon />
                </ToggleButton>
              </Tooltip>
              <Tooltip title="Measure Area (Use right click)">
                <ToggleButton value="Polygon">
                  <SquareFootIcon />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            {measurement.value !== 0 && (
              <Typography align="left">
                {`${measurement.value.toFixed(2)} ${measurement.unitOfMeasure === "m" ? "m" : "m²"}`}
              </Typography>
            )}
          </Grid>
        </Grid>

        <DefaultMap
          controls={controls}
          interactions={interactions}
          additionalLayers={[
            ...safeAdditionalLayers,
            <Fragment key="measurementSource">
              <VectorLayer
                zIndex={1000}
                source={measurementSource}
                style={feature =>
                  getNonParcelFeatureStyle(feature, "red", true, "measurement", "white", 0.75, "black", 4)
                }
              />
            </Fragment>,
          ]} // Add measurementSource to layers
          center={center}
          showPark={true}
          showBlocks={true}
          showParcels={true}
          showBuildings={true}
          showSheds={true}
          showRoads={true}
          showGreenAreas={true}
          isEditable={isEditable}
          showSateliteImage={showSateliteImage}
          showCoordinate={true}
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

export default React.memo(ViewMap);