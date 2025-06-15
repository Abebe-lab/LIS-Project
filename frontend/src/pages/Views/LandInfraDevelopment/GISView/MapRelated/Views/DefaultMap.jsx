import React, { useMemo } from "react";
import Map from "../Map/index.js";
import { Layers, TileLayer } from "../Layers/index.js";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../Util/Util.js";
import CommonLayers from "./CommonLayers";
import useMapData from "../hooks/useMapData.jsx";
import { CoordinateControl, NorthArrowControl, ScaleLineControl } from "../Controls"; // New control
import OverviewMapControl from "../Controls/OverviewMapControl.jsx";

//prettier-ignore
const DefaultMap = ({ controls, interactions, additionalLayers = [], center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM, showPark = true, 
  showBlocks = true, showParcels = true, showSheds = true, showBuildings = true, showRoads = true, showGreenAreas = true, 
  showOtherInfras = false, showImporteds = false, showGCPS = false, showWasteDisposals = false, showWaters = false, showPowers = false, 
  showCommunications = false, showStorages = false, showSurveyDatas = false, showPlans = false, showSateliteImage = true, 
  showUnaprovedImports=false, parcelsCategory = "OCCUP", isEditable = false, showCoordinate = true , showNorth = true,showMapPreview=false, showScaleLine = false }) => {
    //prettier-ignore
  const { park, blocks, parcels, sheds, buildings, otherInfras, greenAreas, importeds, roads, gcps,
    wasteDisposals, waters, powers, communications, storages, surveyDatas, plans, unapprovedImports, unapprovedSplitAndMerges } = useMapData();

  const baseLayers = useMemo(
    () => <TileLayer label="OSM" title="osm" feature="OSM" zIndex={0} />,
    [],
  );

  return (
    <Map center={center} zoom={zoom}>
      <Layers>
        {showSateliteImage && baseLayers}
        <CommonLayers 
          park={showPark && park} 
          blocks={showBlocks && blocks} 
          parcels={showParcels && parcels} 
          sheds={showSheds && sheds}
          parcelsCategory={parcelsCategory} 
          otherInfras={showOtherInfras && otherInfras} 
          greenAreas={showGreenAreas && greenAreas}
          importeds={showImporteds && importeds} 
          roads={showRoads && roads} 
          gcps={showGCPS && gcps}
          wasteDisposals={showWasteDisposals && wasteDisposals} 
          waters={showWaters && waters} 
          powers={showPowers && powers}
          communications={showCommunications && communications} 
          storages={showStorages && storages}
          buildings={showBuildings && buildings} 
          surveyDatas={showSurveyDatas && surveyDatas} 
          plans={showPlans && plans} 
          unapprovedImports={showUnaprovedImports && unapprovedImports}
          unapprovedSplitAndMerges={showUnaprovedImports && unapprovedSplitAndMerges}
          isEditable={isEditable}
        />
        {additionalLayers}
      </Layers>
      {controls}
      {showMapPreview && <OverviewMapControl rotateWithView= {false} /> }
      {interactions}
      {showCoordinate && <CoordinateControl position="bottom-center" />}
      {showNorth && <NorthArrowControl />}
      {showScaleLine && <ScaleLineControl />}
    </Map>
  );
};

export default DefaultMap;
