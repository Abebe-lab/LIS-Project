import React from "react";

const MapContext = React.createContext({
  map: null,
  mapData: {
    zoom: null,
    center: null,
    selectedFeatures: [],
    visibleLayers: [],
    extent: null,
  },
  setMap: () => {},
  updateMapData: () => {},
  getSelectedFeatures: () => [],
  getVisibleLayers: () => [],
  getCurrentExtent: () => null,
});

export default MapContext;
