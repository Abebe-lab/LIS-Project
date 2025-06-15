import { useContext, useEffect } from "react";
import { Control } from "ol/control";
import MapContext from "../Map/MapContext";

const NorthArrowControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const northArrowControl = new Control({
      element: document.createElement("div"),
    });

    // North arrow SVG
    northArrowControl.element.innerHTML = `
         <svg width="40" height="40" viewBox="0 0 20 20">
            <path d="M10 0L20 20H0L10 0Z" fill="white" stroke="navy" stroke-width="1"/>
            <path d="M10 2L10 16" stroke="navy" stroke-width="2"/>
            <path d="M7 6L10 2L13 6" stroke="navy" stroke-width="2"/>
        </svg>`;

    northArrowControl.element.className = "ol-north-arrow ol-unselectable ol-control";

    // Align to the right top corner
    northArrowControl.element.style.cssText = `
            position: absolute;
            top: 2vh;
            left: 10vh;
            cursor: pointer;
            user-select: none;
        `;

    northArrowControl.element.addEventListener("click", () => {
      if (map.getView()) {
        map.getView().setRotation(0);
      }
    });

    map.addControl(northArrowControl);

    return () => {
      map.removeControl(northArrowControl);
    };
  }, [map]);

  return null;
};

export default NorthArrowControl;
