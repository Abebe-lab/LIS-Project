import React, { useState, useRef } from "react";
import ViewMap from "./Views/ViewMap.jsx";
import useMapData from "./hooks/useMapData.jsx";
import shpwrite from "shp-write-pure"; // For Shapefile export
import tokml from "geojson-to-kml";
import { FloatingRightSingleFormDownFromSearchPark } from "../../../../../styles/Form/FormStyles";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import IPDCToastMessageResult from "../../../../../components/Controls/IPDCToastMessageResult.jsx";
import ParkList from "../../../Shared/PreRenderedComponents/ParkList.jsx";
import *as turf from "@turf/turf";

const featureTypes = [
  { key: "park", label: "Park" },
  { key: "BLOCKs", label: "Block" },
  { key: "PARCELs", label: "Parcel" },
  { key: "buildings", label: "Building" },
  { key: "roads", label: "Road" },
  { key: "greenareas", label: "Green Area" },
  { key: "powers", label: "Power supply" },
  { key: "communications", label: "Communication" },
  { key: "storages", label: "Storage" },
  { key: "wastedisposals", label: "Waste Disposal" },
  { key: "waters", label: "Water supply" },
  { key: "gcps", label: "GCPs" },
  { key: "surveyDatas", label: "Survey Point" },
  { key: "plans", label: "Plan" },
];

export default function ExportDataPage() {
  const mapRef = useRef(null); // Use useRef for map instance
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedFeatureType, setFeatureType] = useState(featureTypes[0].key);
  const [selectedFormat, setSelectedFormat] = useState("GeoJSON");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const data = useMapData();

  const exportAsGeojson = async resultToExport => {
    // Convert the result to a GeoJSON string
    const geojson = JSON.stringify(resultToExport);

    // Option 1: Download the file
    const blob = new Blob([geojson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedFeatureType + ".geojson";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return selectedFeatureType + ".geojson";
  };
  const exportAsShape = async resultToExport => {
    try {
      const options = {
        outputType: "blob", // Specify output type here
      };

      const { compression = "STORE", ...restOptions } = options; // Set default 'STORE' for compression

      const shapefileData = await shpwrite.zip(resultToExport, {
        compression,
        ...restOptions,
      });
      if (shapefileData) {
        console.log(shapefileData);
        // Option 1: Download the file
        const blob = new Blob([shapefileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = selectedFeatureType + ".zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return selectedFeatureType + ".zip";
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const exportAsKml = async resultToExport => {
    try {
      const kmlNameDescription = tokml(resultToExport);
      // Option 1: Download the file
      const blob = new Blob([kmlNameDescription], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFeatureType + ".kml";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return selectedFeatureType + ".kml";
    } catch (err) {
      console.log(err);
    }
  };
  const filterParkAndFeatureFirst = async (parkId, featureType) => {
    if (!data) return null;
  
    // Find the park boundary
    const park = data['park'].features.find(park => park?.id === parkId);
    if (!park) {
      console.warn('Park not found with id:', parkId);
      return null;
    }
    const parkBoundary = park.geometry;
  
    // Convert park boundary to a turf polygon if it's not already in the correct format
    const parkPolygon = turf.polygon(parkBoundary.coordinates);
  
    // Normalize the feature type for lookup
    const normalizedFeatureType = featureType?.toLowerCase();
  
    // Filter features that are within the park
    const featuresInPark = data[normalizedFeatureType]?.features.filter(feature => {
      // Convert the feature's geometry to a turf point or polygon depending on its type
      let featureGeometry;
      if (feature.geometry.type === 'Point') {
        featureGeometry = turf.point(feature.geometry.coordinates);
      } else if (feature.geometry.type === 'Polygon') {
        featureGeometry = turf.polygon(feature.geometry.coordinates);
      } else {
        // Handle other geometry types if necessary
        console.warn('Unsupported geometry type:', feature.geometry.type);
        return false;
      }
  
      // Check if the feature is within or intersects the park boundary
      return turf.booleanWithin(featureGeometry, parkPolygon);
    });
  
    // If no features are found within the park, return null or an empty array as needed
    return featuresInPark?.length > 0 ? { type: 'FeatureCollection', features: featuresInPark } : null;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedPark && selectedFeatureType && selectedFormat) {
        //console.log(selectedFeatureType?.toLowerCase(), selectedFormat);
        const resultToExport = await filterParkAndFeatureFirst(selectedPark?.id, selectedFeatureType);
        
        console.log("features in park", resultToExport);
        //return;
        if (!resultToExport) {
          setResponseMessage("Can't export right now, please wait and try again or there is no data to export!");
          setMessageType("info");
          return;
        }
        if (selectedFormat === "GeoJSON") {
          const exportedAs = await exportAsGeojson(resultToExport);
          setResponseMessage('Successfully exported as "' + exportedAs + '" in your default download folder.');
          setMessageType("success");
          return;
        } else if (selectedFormat === "Shapefile") {
          console.log("Shape file xport started");
          const exportedAs = await exportAsShape(resultToExport);
          if (exportedAs) {
            setResponseMessage('Successfully exported as "' + exportedAs + '" in your default download folder.');
            setMessageType("success");
          } else {
            setResponseMessage("Unable to export to shape because the features are in use, please try again later.");
            setMessageType("error");
          }
        } else if (selectedFormat === "kml") {
          const exportedAs = await exportAsKml(resultToExport);
          setResponseMessage('Successfully exported as "' + exportedAs + '" in your default download folder.');
          setMessageType("success");
          return;
        }
      }
    } catch (error) {
      setResponseMessage("An error occurred: " + error.message);
      setMessageType("error");
      console.error(error);
    }
  };

  return (
    <>
      <Paper sx={{ ...FloatingRightSingleFormDownFromSearchPark, p: 2 }} elevation={3}>
        {" "}
        {/* Added padding */}
        <Typography variant="h5" gutterBottom align="center">
          Export Spatial Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} isRequired={true} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="featureType-label">Feature Type</InputLabel>
                <Select
                  labelId="featureType-label"
                  id="featureType"
                  value={selectedFeatureType}
                  label="Feature Type"
                  onChange={e => setFeatureType(e.target.value)}
                >
                  {featureTypes.map(type => (
                    <MenuItem key={type.key} value={type.key}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="format-label">Format</InputLabel>
                <Select
                  labelId="format-label"
                  id="format"
                  value={selectedFormat}
                  label="Format"
                  onChange={e => setSelectedFormat(e.target.value)}
                >
                  <MenuItem value="GeoJSON">GeoJSON</MenuItem>
                  <MenuItem value="Shapefile">Shapefile</MenuItem>
                  <MenuItem value="kml">KML</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Export
              </Button>
            </Grid>
          </Grid>
        </Box>
        {responseMessage && <IPDCToastMessageResult message={responseMessage} type={messageType} />}
      </Paper>
      <ViewMap ref={mapRef} isEditable={false} showLegend={false} />
    </>
  );
}
