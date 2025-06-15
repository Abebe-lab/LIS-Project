import { useContext, useEffect, useState } from "react";
import { Control } from "ol/control";
import MapContext from "../Map/MapContext";

const CoordinateControl = ({ position = "bottom-center" }) => {
  const { map } = useContext(MapContext);
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    if (!map) return;

    const coordinateControl = new Control({
      element: document.createElement("div"),
    });

    const updateCoordinates = event => {
      const coord = event.coordinate;
      setCoordinates(coord ? `${coord[0].toFixed(4)}, ${coord[1].toFixed(4)}` : "");
    };

    coordinateControl.element.innerHTML = '<div class="ol-coordinates-inner"></div>';

    const innerDiv = coordinateControl.element.querySelector(".ol-coordinates-inner");
    innerDiv.textContent = coordinates; // Initial empty content

    map.on("pointermove", updateCoordinates);
    map.addControl(coordinateControl);

    // Apply inline styling
    coordinateControl.element.style.cssText = `
      background: rgba(255, 255, 255, 0.8);
      padding: 5px 10px;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #333;
      position: absolute;
      bottom: 5px;
      z-index: 1000;
    `;

    if (position === "bottom-center") {
      coordinateControl.element.style.left = "50%";
      coordinateControl.element.style.transform = "translateX(-50%)";
    } else if (position === "bottom-left") {
      coordinateControl.element.style.left = "10%";
    } else if (position === "bottom-right") {
      coordinateControl.element.style.right = "20%";
    }

    // Style the inner div
    innerDiv.style.cssText = `
      user-select: none;
      pointer-events: none;
    `;

    // Update the DOM when coordinates change
    const observer = new MutationObserver(() => {
      if (innerDiv) {
        innerDiv.textContent = coordinates;
      }
    });
    observer.observe(coordinateControl.element, { childList: true });

    return () => {
      map.un("pointermove", updateCoordinates);
      map.removeControl(coordinateControl);
      observer.disconnect();
    };
  }, [map, coordinates]);

  return null;
};

export default CoordinateControl;
