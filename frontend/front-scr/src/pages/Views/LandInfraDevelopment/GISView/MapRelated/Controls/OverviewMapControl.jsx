import { useContext, useEffect, useState } from "react";
import { OverviewMap } from "ol/control";
import { Tile as TileLayer } from "ol/layer";
import { OSM as osm } from "ol/source";
import { getProjectedVector, getProjectedFromAdindan } from "../Util/Util.js";
import { getNonParcelFeatureStyle } from "../Style/NonParcelStyler.jsx";

import MapContext from "../Map/MapContext";
import useMapData from "../hooks/useMapData.jsx";
import VectorLayer from "../Layers/VectorLayer.js";

const OverviewMapControl = ({ rotateWithView = false }) => {
  const { map } = useContext(MapContext);
  const { park, blocks, parcels, roads } = useMapData();
  const [showRoad, setShowRoad] = useState(null);

  useEffect(() => {
    if (!map) return;

    const overviewMapControl = new OverviewMap({
      className: "ol-overviewmap ol-custom-overviewmap",
      layers: [
        new TileLayer({
          source: new osm({ title: "OpenStreetMap" }),
        }),
        //showRoad,
      ].filter(Boolean), // Remove any null layers
      collapseLabel: "\u00BB",
      label: "\u00AB",
      collapsed: false,
    });

    overviewMapControl.setRotateWithView(rotateWithView);

    map.addControl(overviewMapControl);

    return () => {
      map.removeControl(overviewMapControl);
    };
  }, [map, rotateWithView]);

  /*useEffect(() => {
    if(!map) return;
    if (roads) {
      setShowRoad(
        <VectorLayer
          title="Roads"
          source={getProjectedVector(roads)}
          style={feature => getNonParcelFeatureStyle(feature, "grey")}
          zIndex={15}
        />,
      );
      map.addLayer(showRoad);
    } 
  }, [map, roads]);*/

  return null;
};

export default OverviewMapControl;
