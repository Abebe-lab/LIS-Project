import React, { useRef, useState, useEffect, useCallback } from "react";
import { Box, Button, Stack, TextField, MenuItem, Typography, Divider } from "@mui/material";
import html2canvas from "html2canvas";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../Util/Util";
import { GeneratePreview } from "./GeneratePreview";
import DefaultMap from "../Views/DefaultMap";
import MapDataProvider from "../MapData/MapDataProvider";
import { GetLegends } from "./GetLegends";
import NavigateToPark from "../Views/NavigateToPark";

const PAPER_SIZES = {
  A0: { width: 841, height: 1189 },
  A1: { width: 594, height: 841 },
  A2: { width: 420, height: 594 },
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
};

const INITIAL_LAYERS = {
  park: true,
  blocks: true,
  parcels: true,
  sheds: true,
  buildings: true,
  roads: true,
  greenAreas: true,
  otherInfras: false,
  gcps: false,
  wasteDisposals: false,
  waters: false,
  powers: false,
  communications: false,
  storages: false,
  surveyDatas: false,
  plans: false,
};

const PrintMap = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("My Map");
  const [scale, setScale] = useState(5000);
  const [paperSize, setPaperSize] = useState("A4");
  const [paperOrientation, setPaperOrientation] = useState("portrait");
  const [resolution, setResolution] = useState(72);
  const [layerVisibility, setLayerVisibility] = useState(INITIAL_LAYERS);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom,setZoom]=useState(DEFAULT_ZOOM);



  const getPaperDimensions = useCallback(() => {
    const { width, height } = PAPER_SIZES[paperSize] || PAPER_SIZES.A4;
    return paperOrientation === "portrait"
      ? { width, height }
      : { width: height, height: width }; // Swap for landscape
  }, [paperSize, paperOrientation]);

  useEffect(() => {
    if (!mapRef.current?.getOlMap()) return;
    const olMap = mapRef.current.getOlMap();
    const view = olMap.getView();
    const { width, height } = getPaperDimensions();
    const mapWidth = width * (resolution / 25.4);
    const mapHeight = height * (resolution / 25.4);
    const maxResolution = Math.max(center[0] / mapWidth, center[1] / mapHeight);

    if (scale === "fit") {
      view.setResolution(maxResolution);
    } else {
      view.setResolution((view.getResolution() * center[0]) / scale);
    }
  }, [scale, paperSize, paperOrientation, resolution, getPaperDimensions]);

  useEffect(() => {
    const handleEscape = event => event.key === "Escape" && setPreviewUrl(null);
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handlePreview = async () => {
    const canvas = await html2canvas(mapContainerRef.current, { useCORS: true, scale: resolution / 72 });
    setPreviewUrl(canvas.toDataURL("image/png"));
  };

  const handlePrint = () => {
    if (!previewUrl) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(GeneratePreview(title, previewUrl));
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
  };/*
  useEffect(() => {
    if (!mapRef.current?.getOlMap()) return;
    const olMap = mapRef.current.getOlMap();
    const view = olMap.getView();
    const { width, height } = getPaperDimensions();
    
    const dpiScale = resolution / 25.4; // Convert mm to pixels
    const mapWidth = width * dpiScale;
    const mapHeight = height * dpiScale;
    
    view.setResolution(Math.max(center[0] / mapWidth, center[1] / mapHeight));
    olMap.updateSize(); // Ensure map updates
  }, [scale, paperSize, paperOrientation, resolution]);*/
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh", p: 2 }}>
      <Box sx={{ width: "100%", height: "30%", position: "relative" }}>
        <Typography variant="h5" gutterBottom>
          Map Printing Preferences
        </Typography>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <TextField select label="Scale" value={scale} onChange={e => setScale(e.target.value)}>
            {["fit", 500, 1000, 2000, 5000, 10000, 25000, 50000].map(s => (
              <MenuItem key={s} value={s}>
                1:{s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Resolution (DPI)"
            type="number"
            value={resolution}
            onChange={e => setResolution(Number(e.target.value))}
          />
          <TextField select label="Paper Size" value={paperSize} onChange={e => setPaperSize(e.target.value)}>
            {Object.keys(PAPER_SIZES).map(size => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Orientation"
            value={paperOrientation}
            onChange={e => setPaperOrientation(e.target.value)}
          >
            <MenuItem value="portrait">Portrait</MenuItem>
            <MenuItem value="landscape">Landscape</MenuItem>
          </TextField>
        </Stack>
        <NavigateToPark center={center} setCenter={setCenter} showImageOnly={false} />
      </Box>

      <Box
  ref={mapContainerRef}
  sx={{
    width: `${getPaperDimensions().width}mm`,
    height: `${getPaperDimensions().height}mm`,
    position: "relative",
  }}
>
        <MapDataProvider>
          <DefaultMap
            ref={mapRef}
            center={center}
            zoom={zoom}
            {...layerVisibility}
            showSateliteImage={true}
            showMapPreview={false}
            showLegend={true}
            showScaleLine={true}
            showNorth={true}
          >
            <GetLegends layers={layerVisibility} />
          </DefaultMap>
        </MapDataProvider>
      </Box>

      <Stack direction="row" spacing={2} sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}>
        <Button variant="contained" onClick={handlePreview}>
          Preview Map
        </Button>
        <Button variant="contained" onClick={handlePrint} disabled={!previewUrl}>
          Print Map
        </Button>
      </Stack>

      {previewUrl && (
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: 16,
            zIndex: 1000,
            backgroundColor: "white",
            padding: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6">
            Preview<Button onClick={() => setPreviewUrl(null)}>Close</Button>
          </Typography>
          <img src={previewUrl} alt="Map Preview" style={{ width: "300px" }} />
        </Box>
      )}
    </Box>
  );
};

export default PrintMap;
