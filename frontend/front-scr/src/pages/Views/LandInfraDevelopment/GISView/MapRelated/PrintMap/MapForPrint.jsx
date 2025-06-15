import React, { useEffect, useRef, forwardRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { fromLonLat } from "ol/proj";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../Util/Util";

const MapForPrint = forwardRef((props, ref) => {
  const {
    layers = [],
    north = true,
    scaleLine = true,
    children,
    center,
    zoom,
    scale,
    paperSize,
    paperOrientation,
  } = props;
  const mapRef = useRef(null);

  useEffect(() => {
    const [width, height] =
      paperSize === "A4"
        ? paperOrientation === "portrait"
          ? [595, 842]
          : [842, 595]
        : paperOrientation === "portrait"
        ? [794, 1123]
        : [1123, 794]; // A3 size

    const resolution = (scale * 1000) / Math.min(width, height); // Adjust resolution based on scale
    // Initialize the OpenLayers map
    const map = new Map({
      target: mapRef.current,
      layers: layers, // Use the layers passed as props
      view: new View({
        center: center || fromLonLat(DEFAULT_CENTER),
        zoom: zoom || DEFAULT_ZOOM,
        resolution: resolution,
      }),
      controls: defaultControls().extend(
        scaleLine
          ? [
              new ScaleLine({
                units: "metric", // or 'imperial'
              }),
            ]
          : [],
      ),
    });

    // Add North Arrow if enabled
    if (north) {
      const northArrow = document.createElement("div");
      northArrow.innerHTML = "⬆️"; // Use a Unicode arrow or an image
      northArrow.style.fontSize = "24px";
      northArrow.style.position = "absolute";
      northArrow.style.bottom = "10px";
      northArrow.style.right = "10px";
      northArrow.style.zIndex = 1000; // Ensure it's above the map
      mapRef.current.appendChild(northArrow);
    }

    // Forward the map instance to the parent component via ref
    if (ref) {
      ref.current = map;
    }

    // Cleanup on unmount
    return () => {
      map.setTarget(null);
    };
  }, [ref, layers, north, scaleLine, scale, paperSize, paperOrientation, center, zoom]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      {children} {/* Render children (e.g., legend) */}
    </div>
  );
});

export default MapForPrint;
