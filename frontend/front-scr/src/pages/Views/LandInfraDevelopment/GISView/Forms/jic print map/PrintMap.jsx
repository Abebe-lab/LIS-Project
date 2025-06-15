import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import ScaleLine from "ol/control/ScaleLine";
import { defaults as defaultControls } from "ol/control";
import { METERS_PER_UNIT } from "ol/proj";
import { DEFAULT_CENTER } from "../../MapRelated/Util/Util";

// Custom controls for legend and north arrow
//import { LegendControl } from './LegendControl'; // Assume you've created this component for the legend
//import { NorthArrowControl } from './NorthArrowControl'; // Assume this exists for the north arrow

const PrintMap = ({ title, scale = 1000, paperSize = "A4", orientation = "landscape" }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: DEFAULT_CENTER,
        zoom: 2,
      }),
      controls: defaultControls().extend([
        new ScaleLine(),
        //new LegendControl(),
        //new NorthArrowControl()
      ]),
    });

    setMap(initialMap);

    return () => initialMap.setTarget(null);
  }, []);

  const createImageFromDOM = async () => {
    if (!map) return null;

    const mapElement = map.getTargetElement();
    const canvas = mapElement.querySelector("canvas");

    // Dimensions based on paper size and orientation
    const dimensions = {
      A4: [297, 210], // mm
      A3: [420, 297], // mm
    }[paperSize];

    const [width, height] = orientation === "landscape" ? [dimensions[1], dimensions[0]] : dimensions;

    // Resize map to fit print dimensions in mm to pixels (assuming 96 dpi for conversion)
    mapElement.style.width = `${(width * 96) / 25.4}px`;
    mapElement.style.height = `${(height * 96) / 25.4}px`;
    map.updateSize();

    // Fit the map to the scale if provided
    const view = map.getView();
    const currentResolution = view.getResolution();
    if (scale) {
      const newResolution = getResolutionFromScale(scale, "m");
      view.setResolution(newResolution);
    }

    // Render map with new settings
    map.renderSync();

    // Draw title and scale
    const ctx = canvas.getContext("2d");
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width / 2, 30);

    // Reset resolution
    view.setResolution(currentResolution);

    return canvas.toDataURL("image/png");
  };

  const getResolutionFromScale = (scale, units) => {
    const mpu = METERS_PER_UNIT[units];
    const inchesPerMeter = 39.37;
    return scale / (mpu * inchesPerMeter * 72); // Assuming 72 dpi for simplicity
  };

  const handlePrint = async () => {
    try {
      const imageData = await createImageFromDOM();
      if (!imageData) throw new Error("Failed to capture map image");

      const pdf = new jsPDF(orientation === "landscape" ? "l" : "p", "mm", paperSize);
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${title || "map"}.pdf`);
      };
    } catch (error) {
      console.error("Error during printing:", error);
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
      <button onClick={handlePrint}>Print Map</button>
    </div>
  );
};

export default PrintMap;
