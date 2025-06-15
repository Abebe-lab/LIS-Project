import { useContext } from 'react';
import MapContext from './MapContext';

/**
 * Custom hook for accessing map context and functionality
 * @returns {Object} Map context and utility functions
 */
const useMap = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMap must be used within a MapContext.Provider');
  }

  const { map, mapData, setMap, updateMapData, getSelectedFeatures, getVisibleLayers, getCurrentExtent } = context;

  return {
    // Core map instance and data
    map,
    mapData,
    
    // Map state getters
    zoom: mapData.zoom,
    center: mapData.center,
    extent: mapData.extent,
    selectedFeatures: mapData.selectedFeatures,
    visibleLayers: mapData.visibleLayers,
    
    // Map functions
    setMap,
    updateMapData,
    getSelectedFeatures,
    getVisibleLayers,
    getCurrentExtent,
    
    // Utility functions
    setZoom: (zoom) => map?.getView().setZoom(zoom),
    setCenter: (center) => map?.getView().setCenter(center),
    setExtent: (extent) => map?.getView().fit(extent),
    refreshMap: () => map?.updateSize(),
  };
};

export default useMap; 