import React, { useRef, useState, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import ScaleLine from "ol/control/ScaleLine";
import Overlay from "ol/Overlay";
import "ol/ol.css";
//prettier-ignore
import { Select, Button, FormControl, InputLabel, MenuItem, Grid, Paper, Typography, Box, TextField } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import LegendControl from "./LegendControl";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../MapRelated/Util/Util";

//prettier-ignore
import { mmToPixel, pixelToMm, calculateZoomForScale, PAPER_SIZES_PORTRAIT, PAPER_ORIENTATIONS, MAP_SCALES, DPIS, } from "./AvailableMapOptionsAndFunctions";

import MapTitleDisplay from "./MapTitleDisplay";

// Styled Paper for better visual separation
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const dpi = DPIS[0]; // 0 is 72

const PrintableMap = ({ initialLayers = [], center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [paperSize, setPaperSize] = useState("A4");
  const [mapScale, setMapScale] = useState(5000); // Default scale 1:50000
  const [currentLayers, setCurrentLayers] = useState([]);
  const [mapTitle, setMapTitle] = useState(""); // State for map title
  const [paperOrientation, setPaperOrientation] = useState("Portrait"); // State for paper orientation
  const [viewProjection, setViewProjection] = useState("EPSG:3857"); // Default to Web Mercator, adjust if needed

  const [printPreviewMode, setPrintPreviewMode] = useState(false);
  const [isPreviewed, setIsPreviewed] = useState(false); // NEW STATE: Track preview status

  const handlePaperSizeChange = event => {
    setPaperSize(event.target.value);
  };

  const handleMapScaleChange = event => {
    setMapScale(parseInt(event.target.value, 10));
  };

  const handleTitleChange = event => {
    setMapTitle(event.target.value);
  };

  const handlePaperOrientationChange = event => {
    setPaperOrientation(event.target.value);
  };

  const handlePrintPreview = () => {
    setPrintPreviewMode(true);
    setIsPreviewed(true); // SET isPreviewed to true when preview is clicked
    setTimeout(() => {
      mapInstance.current?.updateSize();
    }, 0);
  };

  const handlePrint = () => {
    setPrintPreviewMode(true); // Ensure print styles are applied
    setTimeout(() => {
      window.print();
      setPrintPreviewMode(false); // Reset after printing
      setIsPreviewed(false); // Reset isPreviewed after printing
      // Re-render map to normal size after print
      setTimeout(() => {
        mapInstance.current?.updateSize();
      }, 0);
    }, 0);
  };

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers:
        initialLayers.length > 0
          ? initialLayers
          : [
              new TileLayer({
                source: new OSM(),
                visible: true,
                title: "OpenStreetMap Base",
              }),
            ],
      view: new View({
        center: center,
        zoom: zoom,
        projection: viewProjection, // Set the projection here, default Web Mercator
      }),
      controls: [new ScaleLine()],
    });

    // --- North Arrow Logic INLINED here ---
    const northArrowElement = document.createElement("div");
    const northArrowOverlay = new Overlay({
      element: northArrowElement,
      positioning: "top-left",
      offset: [10, -10],
    });

    const canvas = document.createElement("canvas");
    canvas.width = 40;
    canvas.height = 40;
    northArrowElement.style.position = "absolute";
    northArrowElement.style.top = "100px";
    northArrowElement.style.left = "100px";
    northArrowElement.style.zIndex = "1000000000";
    northArrowElement.appendChild(canvas);

    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = "black";
      context.fillStyle = "black";
      context.lineWidth = 2;

      // North Arrow Styling - Simple Triangle
      context.beginPath();
      context.moveTo(canvas.width / 2, 5); // Top point
      context.lineTo(canvas.width / 4, canvas.height - 5); // Bottom Left
      context.lineTo((canvas.width * 3) / 4, canvas.height - 5); // Bottom Right
      context.closePath();
      context.fill();
      context.stroke();

      // Draw 'N'
      context.fillStyle = "white";
      context.font = "bold 12px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("N", canvas.width / 2, canvas.height / 2 + 2);
    }

    initialMap.addControl(northArrowOverlay); // Add as Overlay, not Control
    // --- End of Inlined North Arrow Logic ---

    mapInstance.current = initialMap;
    setCurrentLayers(initialMap.getLayers().getArray()); // Initialize currentLayers
    setViewProjection(initialMap.getView().getProjection().getCode()); // Update viewProjection state

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined); // Clean up map instance on unmount
        mapInstance.current = null;
      }
    };
  }, [initialLayers, viewProjection]); // Added viewProjection to dependency array to react to projection changes if you make projection selectable

  useEffect(() => {
    if (!mapInstance.current) return;

    let selectedPaper = PAPER_SIZES_PORTRAIT[paperSize];
    let paperWidthPx = mmToPixel(selectedPaper.width, dpi);
    let paperHeightPx = mmToPixel(selectedPaper.height, dpi);

    if (paperOrientation === "Landscape") {
      // Swap width and height for landscape
      paperWidthPx = mmToPixel(selectedPaper.height, dpi);
      paperHeightPx = mmToPixel(selectedPaper.width, dpi);
    }

    mapInstance.current.setSize([paperWidthPx, paperHeightPx]);

    const view = mapInstance.current.getView();

    // Calculate zoom level based on scale using the adjusted function and view projection
    const targetZoom = calculateZoomForScale(mapScale, pixelToMm(paperWidthPx, dpi), dpi, viewProjection);
    // Animation for smoother zoom change
    view.animate({ zoom: targetZoom, duration: 500 });

    view.fit(view.calculateExtent([paperWidthPx, paperHeightPx]), { padding: [20, 20, 20, 20], duration: 500 });
  }, [paperSize, mapScale, paperOrientation, printPreviewMode, viewProjection]); // Keep viewProjection in dependency array

  const toggleLayerVisibility = layer => layer.setVisible(!layer.getVisible());

  return (
    <Grid container spacing={2} className={printPreviewMode ? "print-mode" : ""}>
      <Grid item xs={12} md={9} lg={10} className="map-container" style={{ position: "relative" }}>
        {/* Relative positioning for title */}
        {mapTitle && <MapTitleDisplay title={mapTitle} />}

        <div
          ref={mapRef}
          className="ol-map"
          style={{
            width: "100%",
            height: "calc(100vh - 20px)",
            ...(printPreviewMode ? { border: "1px solid black" } : {}),
          }}
        />
        <LegendControl map={mapInstance.current} layers={currentLayers} />
      </Grid>

      <Grid
        item
        xs={12}
        md={3}
        lg={2}
        className="controls-container floating-controls"
        
      >
        {" "}
        {/* Floating Controls */}
        <StyledPaper elevation={3}>
        <Box sx={{ display: printPreviewMode ? "none" : "block" }}>
          <Typography variant="h5" gutterBottom>
            Print Settings
          </Typography>

          <FormControl fullWidth margin="normal">
            <TextField
              key="mapTitle"
              id="map-title-input"
              label="Map Title"
              value={mapTitle}
              onChange={handleTitleChange}
              variant="outlined"
              size="small"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="paper-size-label">Paper Size</InputLabel>
            <Select
              labelId="paper-size-label"
              id="paper-size-select"
              value={paperSize}
              label="Paper Size"
              onChange={handlePaperSizeChange}
              size="small"
            >
              {Object.keys(PAPER_SIZES_PORTRAIT).map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="paper-orientation-label">Orientation</InputLabel>
            <Select
              labelId="paper-orientation-label"
              id="paper-orientation-select"
              value={paperOrientation}
              label="Orientation"
              onChange={handlePaperOrientationChange}
              size="small"
            >
              {PAPER_ORIENTATIONS.map(orientation => (
                <MenuItem key={orientation} value={orientation}>
                  {orientation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="map-scale-label">Map Scale</InputLabel>
            <Select
              labelId="map-scale-label"
              id="map-scale-select"
              value={mapScale}
              label="Map Scale"
              onChange={handleMapScaleChange}
              size="small"
            >
              {MAP_SCALES.map(scale => (
                <MenuItem key={scale} value={scale}>{`1:${scale}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={handlePrintPreview}
              sx={{ mr: 1 }}
              size="small"
            >
              Print Preview
            </Button>

          {isPreviewed &&
            <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={handlePrint} size="small" disabled={!isPreviewed}>
              Print
            </Button>
}
          </Box>
        </StyledPaper>
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Layers
          </Typography>
          <ul>
            {currentLayers.map((layer, index) => (
              <li
                key={index}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}
              >
                <Typography>{layer.get("title") || "Layer " + (index + 1)}</Typography>
                <Button
                  size="small"
                  onClick={() => toggleLayerVisibility(layer)}
                  startIcon={layer.getVisible() ? <VisibilityIcon /> : <VisibilityOffIcon />}
                >
                  {layer.getVisible() ? "Hide" : "Show"}
                </Button>
              </li>
            ))}
          </ul>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default PrintableMap;
