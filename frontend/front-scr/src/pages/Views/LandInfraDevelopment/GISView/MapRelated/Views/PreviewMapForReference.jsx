import React, { useMemo } from "react";
import Map from "../Map/Map.js";
import { Layers, TileLayer } from "../Layers/index.js";
import { DEFAULT_CENTER } from "../Util/Util.js";
import CommonLayers from "./CommonLayers";
import useMapData from "../hooks/useMapData.jsx";
//import {CoordinateControl, NorthArrowControl} from "../Controls"; // New control
//prettier-ignore
const PreviewMapForReference = ({showSateliteImage=true}) => {
    //prettier-ignore
  const { park, blocks, parcels, sheds, roads, buildings } = useMapData();

  const baseLayers = useMemo(() => <TileLayer label="OSM" title="osm" feature="OSM" zIndex={0} />, [], );

  return (
    <Map center={DEFAULT_CENTER} zoom={5}>
      <Layers>
        {showSateliteImage && baseLayers}
        {
          /*
          <CommonLayers 
          park={park && park} 
          blocks={blocks && blocks} 
          parcels={parcels && parcels} 
          sheds={sheds && sheds}
          roads={roads && roads} 
          buildings={buildings && buildings} 
        />
          */
        }
        
      </Layers>
    </Map>
  );
};

export default PreviewMapForReference;
