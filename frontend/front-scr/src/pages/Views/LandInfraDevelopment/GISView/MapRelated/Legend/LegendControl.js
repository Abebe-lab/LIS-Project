import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import LayerSwitcher from "ol-layerswitcher";
import { useLegendSync } from "./useLegendSync";

const LegendControl = () => {
  const { map } = useContext(MapContext);

  // Synchronize legend with layer visibility
  useLegendSync(map);

  useEffect(() => {
    if (!map) return;

    // Create LayerSwitcher with initial collapse state
    const layerSwitcher = new LayerSwitcher({
      activationMode: "click",
      startActive: false, // Starts collapsed
      label: "",
      collapseLabel: "\u00BB",
      expandLabel: "\u00AB", // Label for when it's expanded
      group: false,
      tipLabel: "Legend",
      collapseTipLabel: "Collapse legend",
      expandTipLabel: "Expand legend", // New tooltip for expanding
      reverse: true,
      groupSelectStyle: "children",
      fold: "toggle", // Changed to 'toggle' for expanding/collapsing
    });

    // Add LayerSwitcher to the map
    map.addControl(layerSwitcher);

    // Method to toggle the visibility of the LayerSwitcher
    const toggleVisibility = () => {
      //console.log("toogle changed");
      if (layerSwitcher.element.classList.contains('ol-collapsed')) {
        layerSwitcher.element.classList.remove('ol-collapsed');
      } else {
        layerSwitcher.element.classList.add('ol-collapsed');
      }
    };

    // Add click event listener to toggle visibility
    layerSwitcher.element.addEventListener('click', toggleVisibility);

    // Clean up on component unmount
    return () => {
      map.removeControl(layerSwitcher);
      layerSwitcher.element.removeEventListener('click', toggleVisibility);
    };
  }, [map]);

  return null;
};

export { LegendControl };