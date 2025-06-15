import React, { useRef, useEffect, useState, useContext } from "react";
import MapContext from "../../MapRelated/Map/MapContext";
//import { useMap } from 'react-ol';
import { ScaleLine } from "ol/control";
import OLVectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ViewMap } from "../../MapRelated/Views";
import MapDataProvider from "../../MapRelated/MapData/MapDataProvider";
const PrintComponent = ({ scale, paperSize = "a4", title = "Map Print" }) => {
  const { map } = useContext(MapContext);
  const printCanvasRef = useRef(null);
  const [legendItems, setLegendItems] = useState([]);

  useEffect(() => {
    if (!map) return;

    // Generate legend items from vector layers
    const layers = map
      .getLayers()
      .getArray()
      .filter(layer => layer instanceof OLVectorLayer);
    const legend = layers
      .map(layer => {
        const source = layer.getSource();
        if (source instanceof VectorSource) {
          // Assuming simple style for now; enhance as needed
          const style = layer.getStyle();
          if (typeof style === "function") {
            // Handle style functions if necessary.
            return { name: layer.get("title") || "Untitled Layer", style: null }; // Placeholder
          } else if (Array.isArray(style)) {
            // Handle style arrays if necessary.
            return { name: layer.get("title") || "Untitled Layer", style: null }; // Placeholder
          }
          return { name: layer.get("title") || "Untitled Layer", style };
        }
        return null;
      })
      .filter(item => item);

    setLegendItems(legend);
    console.log("map", map);
    console.log("legend", legend);
  }, [map]);

  const printMap = () => {
    if (!map) return;

    const mapSize = map.getSize();
    if (!mapSize) return;

    const resolution = map.getView().getResolution();
    if (!resolution) return;

    const dpi = 300; // Standard print DPI
    const printWidth = paperSize === "a4" ? (210 / 25.4) * dpi : (297 / 25.4) * dpi; // A4 width in pixels
    const printHeight = paperSize === "a4" ? (297 / 25.4) * dpi : (210 / 25.4) * dpi; // A4 height in pixels

    const printCanvas = document.createElement("canvas");
    printCanvas.width = printWidth;
    printCanvas.height = printHeight;
    const printContext = printCanvas.getContext("2d");

    const viewExtent = map.getView().calculateExtent();

    map.once("rendercomplete", () => {
      const mapCanvas = map.getViewport().querySelector("canvas");
      if (mapCanvas) {
        printContext.drawImage(mapCanvas, 0, 0, printWidth, printHeight);

        // Add title
        printContext.font = "20px Arial";
        printContext.fillText(title, 10, 30);

        // Add north arrow (simple example)
        printContext.beginPath();
        printContext.moveTo(printWidth - 50, 50);
        printContext.lineTo(printWidth - 40, 30);
        printContext.lineTo(printWidth - 30, 50);
        printContext.moveTo(printWidth - 40, 30);
        printContext.lineTo(printWidth - 40, 70);
        printContext.stroke();

        // Add scale bar (basic implementation; needs refinement)
        const scaleLine = new ScaleLine();
        scaleLine.setMap(map);
        const scaleCanvas = scaleLine.element.querySelector("canvas");
        if (scaleCanvas) {
          printContext.drawImage(scaleCanvas, 10, printHeight - 50);
        }

        // Create PDF
        const pdf = new jsPDF({
          orientation: paperSize === "a4" ? "p" : "l", // Portrait or landscape
          unit: "mm",
          format: paperSize,
        });

        pdf.addImage(
          printCanvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          paperSize === "a4" ? 210 : 297,
          paperSize === "a4" ? 297 : 210,
        );

        // Add legend to PDF using autotable
        if (legendItems.length > 0) {
          const legendData = legendItems.map(item => [item.name]);
          pdf.autoTable({
            head: [["Legend"]],
            body: legendData,
            startY: 20, // Adjust vertical position
            margin: { left: 10 },
          });
        }
        pdf.save("map.pdf");

        scaleLine.setMap(null); // Clean up the scale line control
      }
    });

    map.renderSync();
  };

  return (
    <div>
      <button onClick={printMap}>Print Map</button>
      <MapDataProvider>
        <ViewMap ref={printCanvasRef} showLegend={true} showSateliteImage={true} showPopup={false} />
      </MapDataProvider>
    </div>
  );
};

export default PrintComponent;
