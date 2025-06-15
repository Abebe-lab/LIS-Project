import { useEffect, useMemo } from "react";
import { Layers, TileLayer, VectorLayer } from "../../../GISView/MapRelated/Layers/index.js";
import RelativeMap from "../../../GISView/MapRelated/Map/RelativeMap";
import useMapData from "../../../GISView/MapRelated/hooks/useMapData";
import { DEFAULT_CENTER, getProjectedFromAdindan } from "../../../GISView/MapRelated/Util/Util";
import {
  getHatchedParcelFeatureStyle,
  getNonParcelFeatureStyle,
} from "../../../GISView/MapRelated/Style/NonParcelStyler.jsx";
import { parkStyle } from "../../../GISView/MapRelated/Style/MapStyle.js";

//prettier-ignore
export const OverviewMapForPrint = ({selectedFeature,center=DEFAULT_CENTER,extent=null, showSateliteImage = false,closeUp=false, showMeasurement=false}) => {
  const { park, parcels, roads } = useMapData();//const { blocks, sheds, buildings, otherInfras, greenAreas, importeds } = useMapData();
  const baseLayers = useMemo(() => <TileLayer label="OSM" title="osm" feature="OSM" zIndex={0} />, []); 
    useEffect(()=>{
      console.log("Overview Map: ", selectedFeature);
    },[])
  return (
    <RelativeMap center={center} zoom={closeUp? 18.5:15.8}  extent={extent}>
      <Layers>
        {//prettier-ignore
        !closeUp && roads && (
          <VectorLayer title="Roads" source={getProjectedFromAdindan(roads)} style={feature => getNonParcelFeatureStyle(feature, "grey")}
            zIndex={15}
          />
        )}
        {parcels && (
          <VectorLayer title="Parcel" source={getProjectedFromAdindan(parcels)} style={feature => getHatchedParcelFeatureStyle(feature,selectedFeature?.upin, !closeUp,showMeasurement)}
            zIndex={4}
          />
        )}
        {park && (<VectorLayer title="Park Boundary" source={getProjectedFromAdindan(park)} style={parkStyle} zIndex={1} /> )}
        {showSateliteImage && baseLayers && baseLayers}
      </Layers>
    </RelativeMap>
  );
};

