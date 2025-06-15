import { useState, useEffect, useContext, useCallback, useRef } from "react";
//prettier-ignore
import { Box, Grid, TextField, Button, FormControl, InputLabel, MenuItem, Select, Typography, ToggleButtonGroup, ToggleButton, } from "@mui/material";
import { jsPDF } from "jspdf";
import { ViewMap } from "../../MapRelated/Views";
import "./Print-Styling.css";
import MapContext from "../../MapRelated/Map/MapContext";
import { METERS_PER_UNIT } from "ol/proj";
import PrintMap from "./PrintMap";

const PAPER_SIZES = ["A4", "A3", "A2", "A1", "A0"];
const DIMENSIONS = { A0: [1189, 841], A1: [841, 594], A2: [594, 420], A3: [420, 297], A4: [297, 210] };
const RESOLUTIONS = [
  { value: "72", label: "72 dpi (fast)" },
  { value: "150", label: "150 dpi (medium)" },
  { value: "200", label: "200 dpi (medium)" },
  { value: "300", label: "300 dpi (slow)" },
];
const SCALES = [
  { value: "50", label: "1:50000" },
  { value: "25", label: "1:25000" },
  { value: "10", label: "1:10000" },
  { value: "5", label: "1:5000" },
  { value: "2.5", label: "1:2500" },
  { value: "1", label: "1:1000" },
  { value: "0.5", label: "1:500" },
  { value: "0.25", label: "1:250" },
  { value: "0.1", label: "1:100" },
];
//prettier-ignore
const formStyle = { position: "fixed", top: "20%", right: "2%", zIndex: 20, width: "30%", p: 2, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }

const PrintMapForm = () => {
  const { map } = useContext(MapContext);

  const [title, setTitle] = useState("");
  const [dpi, setDpi] = useState(72);
  const [scale, setScale] = useState("25");
  const [paperSize, setPaperSize] = useState("A4");
  const [paperOrientation, setPaperOrientation] = useState("landscape");
  const [responseMessage, setResponseMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  // Ensure map is available before proceeding
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (map) {
      mapRef.current = map;
      setMapReady(true);
    } else {
      console.warn("Map not yet initialized.");
    }
  }, [map]);

  const createImageFromDOM = useCallback(async () => {
    if (!mapRef.current) {
      console.error("Map instance not found.");
      return null;
    }

    const mapElement = mapRef.current.getTargetElement();
    if (!mapElement) {
      console.error("Map element not found in DOM.");
      return null;
    }

    // Adjust map size to match paper dimensions
    const actualDimensions =
      paperOrientation === "landscape" ? [DIMENSIONS[paperSize][1], DIMENSIONS[paperSize][0]] : DIMENSIONS[paperSize];
    //    const mapElement = map.getTargetElement();
    mapElement.style.width = `${actualDimensions[0]}px`;
    mapElement.style.height = `${actualDimensions[1]}px`;
    map.updateSize();

    // Adjust resolution and capture image
    const view = map.getView();
    const oldResolution = view.getResolution();
    const newResolution = getResolutionFromScale(scale, "m");
    view.setResolution(newResolution);
    map.renderSync();

    const canvas = map.getTargetElement().querySelector("canvas");
    if (!canvas) {
      console.error("Canvas not found.");
      return null;
    }

    // Draw title and scale on the canvas
    const context = canvas.getContext("2d");
    if (title) {
      context.font = "bold 24px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText(title, canvas.width / 2, 30);
    }

    const scaleText = `Scale: 1:${scale}`;
    context.font = "16px Arial";
    context.fillText(scaleText, 10, canvas.height - 10);

    // Reset resolution and return the image
    view.setResolution(oldResolution);
    return canvas.toDataURL("image/png");
  }, [map, title, scale, paperSize, paperOrientation]);

  const handlePreview = useCallback(async () => {
    setPreviewImage(true);
    /*try {
      setResponseMessage("Generating preview...");
      const previewImageData = await createImageFromDOM();
      console.log("Preview image data: ", previewImageData);
      if (previewImageData) {
        setPreviewImage(previewImageData);
        setResponseMessage("");
      } else {
        setResponseMessage("Failed to generate preview.");
      }
    } catch (error) {
      console.error("Error generating preview:", error);
      setResponseMessage(`Error generating preview: ${error.message}`);
    }*/
  }, [createImageFromDOM]);

  const handlePrint = useCallback(async () => {
    try {
      setResponseMessage("Preparing to print...");
      const imageData = await createImageFromDOM();
      const actualDimensions =
        paperOrientation === "landscape" ? [DIMENSIONS[paperSize][1], DIMENSIONS[paperSize][0]] : DIMENSIONS[paperSize];
      const pdf = new jsPDF(paperOrientation, "mm", actualDimensions);
      const MARGIN = 10;

      const pdfWidth = actualDimensions[0] - 2 * MARGIN;
      const pdfHeight = actualDimensions[1] - 2 * MARGIN;

      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const widthRatio = pdfWidth / img.width;
        const heightRatio = pdfHeight / img.height;
        const ratio = Math.min(widthRatio, heightRatio);

        const imgWidth = img.width * ratio;
        const imgHeight = img.height * ratio;

        const x = MARGIN + (pdfWidth - imgWidth) / 2;
        const y = MARGIN + (pdfHeight - imgHeight) / 2;

        pdf.addImage(imageData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save(`${title || "map"}.pdf`);
        setResponseMessage("Print job created successfully.");
      };
    } catch (error) {
      console.error("Error during printing:", error);
      setResponseMessage(`Error during printing: ${error.message}`);
    }
  }, [title, paperSize, paperOrientation, createImageFromDOM]);

  const getResolutionFromScale = (scale, units) => {
    const mpu = METERS_PER_UNIT[units];
    const inchesPerMeter = 39.37;
    const numericScale = parseInt(scale, 10);
    return numericScale / (mpu * inchesPerMeter * dpi);
  };

  return (
    <Box sx={{ position: "relative", height: "100vh", padding: 0, margin: 0 }}>
      <form
        id="printForm"
        onSubmit={e => {
          e.preventDefault();
          handlePrint();
        }}
      >
        <Box
          sx={formStyle}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Print Map Page
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Map Title" value={title} onChange={e => setTitle(e.target.value)} required />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="paper-size-label">Paper Size</InputLabel>
                <Select value={paperSize} onChange={e => setPaperSize(e.target.value)}>
                  {PAPER_SIZES.map(size => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="resolution-label">Resolution</InputLabel>
                <Select value={dpi} onChange={e => setDpi(e.target.value)}>
                  {RESOLUTIONS.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="scale-label">Scale</InputLabel>
                <Select value={scale} onChange={e => setScale(e.target.value)}>
                  {SCALES.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={paperOrientation}
                exclusive
                onChange={(e, newOrientation) => setPaperOrientation(newOrientation)}
                fullWidth
              >
                <ToggleButton value="portrait">Portrait</ToggleButton>
                <ToggleButton value="landscape">Landscape</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePreview}
                fullWidth
                sx={{ marginBottom: "10px" }}
                disabled={!mapReady}
              >
                Preview Map
              </Button>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Print Map
              </Button>
            </Grid>
            {responseMessage && (
              <Grid item xs={12}>
                <Typography color={responseMessage.includes("error") ? "error" : "success"}>
                  {responseMessage}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </form>

      {previewImage && (
        <Box>
          <PrintMap title={title} scale={parseFloat(scale) * 1000} />
        </Box>
      )}

      {/* <Box
          sx={{
            position: "fixed",
            top: "20%",
            right: "10%",
            zIndex: 200,
            backgroundColor: "white",
            padding: 2,
            border: "1px solid black",
            width: "70%",
          }}
        >
          <img src={previewImage} alt="Print Preview" zIndex={2000}/>
          {
            //style={{ maxWidth: "80vw", maxHeight: "80vh" }} />
          }
          <Button onClick={() => setPreviewImage(null)} sx={{ marginTop: "10px" }} variant="contained" color="error">
            Close Preview
          </Button>
        </Box>*/}

      <Box>
        <ViewMap showLegend={true} showSateliteImage={false} showPopup={false} />
      </Box>
    </Box>
  );
};

export default PrintMapForm;
