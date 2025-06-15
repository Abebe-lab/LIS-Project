import { useEffect } from "react";
import BaseVectorLayer from "ol/layer/BaseVector";

/**
 * Hook to synchronize legend state with layer visibility.
 * @param {object} map - OpenLayers map instance.
 */
const useLegendSync = map => {
  useEffect(() => {
    if (!map) return;

    const updateLegendState = () => {
      // Iterate through layers to sync legend state
      map.getLayers().forEach(layer => {
        try {
          const title = layer?.get('title');
          
          if (!title) return;
          //console.log("layer added ", title);
          // Find the legend checkbox corresponding to the layer
          const legendElement = document.querySelector(`[data-layer-name="${title}"] input`);

          if (legendElement) {
            legendElement.checked = layer.getVisible();
          }
        } catch (error) {
          console.log(error);
        }
      });
    };

    // Add event listeners for visibility changes
    map.getLayers().forEach(layer => {
      layer.on("change:visible", updateLegendState);
    });

    // Initialize the legend state on load
    updateLegendState();

    // Cleanup: remove event listeners on unmount
    return () => {
      map.getLayers().forEach(layer => {
        layer.un("change:visible", updateLegendState);
      });
    };
  }, [map]);
};

export { useLegendSync };
