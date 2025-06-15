// DrawInteraction.js
import { useContext, useEffect, useRef } from "react";
import { Draw, Snap } from "ol/interaction";
import { LineString, Polygon } from "ol/geom";
import { getArea, getLength } from "ol/sphere";
import MapContext from "../Map/MapContext";

const DrawInteraction = ({ source, type, onMeasurement, setDrawType, setIsDrawing }) => {
  const { map } = useContext(MapContext);
  const drawInteractionRef = useRef(null);
  const snapInteractionRef = useRef(null);

  useEffect(() => {
    if (!map || !source || !type) {
      console.warn("Map, source, or type not provided");
      return;
    }

    const drawInteraction = new Draw({ source: source, type: type });
    // Snap interaction needs to be added after Draw interaction
    const snapInteraction = new Snap({ source: source, pixelTolerance: 10 });
    drawInteraction.on("drawstart", () => {
      // Add Snap interaction when drawing starts
      if (snapInteractionRef.current) map.addInteraction(snapInteractionRef.current);
    });
    drawInteraction.on("drawend", event => {
      const feature = event.feature;
      let measurement = 0;

      if (feature.getGeometry() instanceof LineString) {
        measurement = getLength(feature.getGeometry());
      } else if (feature.getGeometry() instanceof Polygon) {
        measurement = getArea(feature.getGeometry());
      }
      feature.setProperties({ measurement: measurement?.toFixed(2) });
      //console.log("feature", feature);
      if (onMeasurement) {
        onMeasurement(measurement, type);
      }
      setIsDrawing(false); // Indicate that drawing has ended
    });

    // New: Listen for click events to clear the drawn feature
    const handleMapClick = event => {
      if (!setIsDrawing || !drawInteractionRef.current) return;
      if (!event.originalEvent.shiftKey) {
        // Only clear if Shift is not pressed (to avoid clearing during drawing)
        source.clear();
        setDrawType(null); // Optionally reset draw type
      }
    };

    drawInteraction.on("drawabort", () => {
      source.clear();
      setDrawType(null);
    });

    drawInteractionRef.current = drawInteraction;
    snapInteractionRef.current = snapInteraction;

    map.addInteraction(drawInteraction);
    //map.addInteraction(snapInteraction); // Add Snap after Draw

    // Handle escape key to cancel drawing
    const handleEscape = event => {
      if (event.key === "Escape") {
        if (drawInteractionRef.current) {
          drawInteractionRef.current.abortDrawing();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    map.on("click", handleMapClick);

    return () => {
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
      }
      document.removeEventListener("keydown", handleEscape);
      map.un("click", handleMapClick);
    };
  }, [map, source, type, onMeasurement, setDrawType, setIsDrawing]);

  return null;
};

export default DrawInteraction;
