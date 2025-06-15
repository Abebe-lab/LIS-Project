import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import IPDCToastMessageResult from "../../../../../components/Controls/IPDCToastMessageResult";
import { FloatingRightSingleFormDownFromSearchPark } from "../../../../../styles/Form/FormStyles";
import * as MapDataLoader from "../MapRelated/MapData/MapDataLoader";
import * as turf from "@turf/turf";
import proj4 from "proj4";
import { IPDCAttachFile1 } from "../../../../../components/Controls";
import { ExecutePostWithParams } from "../../../../../services/api/ExecuteApiRequests";
//import { FloatingRightSingleFormNearTop } from "../../../../../styles/Form/FormStyles";

const SplitForm = React.forwardRef(({ selectedFeatureOnMap }, ref) => {
  const [upin, setUpin] = useState("");
  const [coordinates, setCoordinates] = useState([{ x: "", y: "" }]);
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  // Auto selection of UPIN when a feature is selected on the map
  useEffect(() => {
    if (selectedFeatureOnMap && selectedFeatureOnMap.length > 0) {
      const selectedUpin = selectedFeatureOnMap[0]?.get("upin") || "";
      if (selectedUpin !== upin) {
        setUpin(selectedUpin);
      }
    }
  }, [selectedFeatureOnMap, upin]);
  // Assuming coordinates are already in the correct projected system (e.g., Web Mercator)
  /*const convertToUTM = (x, y) => {
    const wgs84 = "+proj=longlat +datum=WGS84 +no_defs"; // EPSG:4326
    const utm37n = "+proj=utm +zone=37 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"; // EPSG:32637
    return proj4(wgs84, utm37n, [x, y]);
  };
  const convertToLatLon = (x, y) => {
    const utm37n = "+proj=utm +zone=37 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"; // EPSG:32637
    const wgs84 = "+proj=longlat +datum=WGS84 +no_defs"; // EPSG:4326
    return proj4(utm37n, wgs84, [x, y]);
  };*/
  const convertToEPSG3857 = (x, y) => {
    const wgs84 = "+proj=longlat +datum=WGS84 +no_defs"; // EPSG:4326
    const epsg3857 =
      "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"; // EPSG:3857
    return proj4(wgs84, epsg3857, [x, y]);
  };
  const convertToWGS84 = (x, y) => {
    const epsg3857 =
      "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"; // EPSG:3857
    const wgs84 = "+proj=longlat +datum=WGS84 +no_defs"; // EPSG:4326
    return proj4(epsg3857, wgs84, [x, y]);
  };
  const isCoordinateToSplitFeatureValid = async () => {
    try {
      const existingParcels = await MapDataLoader.loadParcels();
      const featureToSplit = existingParcels.features.find(f => f.properties.upin === upin);

      if (!featureToSplit) {
        setResponseMessage("No spatial data found for the given UPIN");
        setAlertSeverity("error");
        return false;
      }

      const coordinatesOfPoly = featureToSplit.geometry.coordinates;
      const convertedCoordinates = coordinatesOfPoly[0]?.map(coordinate => {
        // No conversion needed if coordinates are already in Web Mercator or similar
        //      console.log("before conversion: ", coordinate);
        return convertToEPSG3857(coordinate[0], coordinate[1]);
      });
      //      console.log("after conversion");
      const polygon = turf.polygon([convertedCoordinates]);

      //console.log("Converted coordinates:", polygon);

      // Convert line coordinates to the same coordinate system as the polygon
      const points = coordinates.map(coord => {
        return [parseFloat(coord.x), parseFloat(coord.y)];
      });
      if (points.length < 2) {
        setResponseMessage("At least two points are needed to form a line for splitting.");
        setAlertSeverity("error");
        return false;
      }
      //console.log("Points for line:", points);
      const line = turf.lineString(points);
      //      console.log("checking the polygon and line");
      //      console.log("Polygon:", polygon);
      //      console.log("LineString:", line);

      if (points.length < 2) {
        setResponseMessage("At least two points are needed to form a line for splitting.");
        setAlertSeverity("error");
        return false;
      }
      try {
        const intersection = turf.lineIntersect(polygon, line);
        //        console.log("Intersection points:", intersection.features.length);
        if (!intersection?.features?.length) {
          console.log("no intersection");
          setResponseMessage("The line does not intersect the polygon.");
          setAlertSeverity("error");
          return false;
        }
      } catch (err) {
        console.log("Error in intersection", err);
      }

      const bufferedLine = turf.buffer(line, 0.0005, { units: "kilometers" });
      const splitResult = turf.difference(polygon, bufferedLine);
      //      console.log("I do not care about the split resul, just checking", splitResult);

      if (splitResult?.geometry?.type === "MultiPolygon" || splitResult?.geometry?.type === "Polygon") {
        //        console.log("valid entered to send data, split result(No need for the result only validation) : ", splitResult);
        return true;
      } else {
        setResponseMessage("The line does not split the polygon into multiple parts.");
        setAlertSeverity("error");
        return false;
      }
    } catch (error) {
      console.error("Error validating coordinates:", error);
      setResponseMessage("An error occurred while validating coordinates.");
      setAlertSeverity("error");
      return false;
    }
  };

  const addCoordinate = () => {
    setCoordinates([...coordinates, { x: "", y: "" }]);
  };

  const removeCoordinate = index => {
    setCoordinates(coordinates.filter((_, i) => i !== index));
  };

  const handleCoordinateChange = (index, field, value) => {
    const newCoords = [...coordinates];
    newCoords[index][field] = value;
    setCoordinates(newCoords);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (coordinates && coordinates.length < 1) {
      setResponseMessage("At least two points are needed to form a line for splitting.");
      setAlertSeverity("warning");
      return;
    }
    const isItPossibleToSplit = await isCoordinateToSplitFeatureValid();
    console.log("the result before submit", isItPossibleToSplit);
    if (!isItPossibleToSplit) {
      setAlertSeverity("warning");
      setResponseMessage("The line does not split the polygon into multiple parts.");
      return;
    } else {
      /*console.log("**NO NEED TO CONVERT TO WGS84**, TO BE CHECKED ON DB but on front both mecater");
      console.log("splitting coodinates", coordinates);
      const convertedToWgsForDB = coordinates.map(coord => {
        return convertToWGS84(parseFloat(coord.x), parseFloat(coord.y));
      });
      console.log("converted for db",convertedToWgsForDB);
      console.log("vs", selectedFeatureOnMap)
      return;*/
      console.log("isItPossibleToSplit :", isItPossibleToSplit ? "true" : "false");
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("upin", upin);
      const convertedToWgsForDB = coordinates.map(coord => {
        return convertToWGS84(parseFloat(coord.x), parseFloat(coord.y));
      });

      let coordJson = convertedToWgsForDB.map(coord => ({
        x: coord.x,
        y: coord.y,
      }));

      // Convert the array to JSON string
      let jsonString = JSON.stringify(coordJson);
      // Append the JSON string to formData
      formDataToSubmit.append("coordinates", jsonString);

      formDataToSubmit.append("description", description);
      formDataToSubmit.append("file", attachment);

      const responseData = await ExecutePostWithParams("splitParcel", formDataToSubmit, true);

      if (responseData) {
        setResponseMessage("Consolidation has been successful. Please refresh the map to see changes.");
        setAlertSeverity("success");
        resetForm();
      } else {
        setResponseMessage("Consolidation failed");
        setAlertSeverity("error");
      }
    }
  };
  const resetForm = () => {
    setUpin("");
    setCoordinates([{ x: "", y: "" }]);
    setAttachment(null);
    setResponseMessage("");
    setDescription("");
  };

  return (
    <Paper sx={{ ...FloatingRightSingleFormDownFromSearchPark }} elevation={3}>
      <form onSubmit={handleSubmit} ref={ref}>
        <Typography variant="h5" align="center" gutterBottom>
          Parcel Subdivide
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="UPIN"
              variant="outlined"
              value={upin}
              onChange={e => setUpin(e.target.value)}
              placeholder="Enter UPIN E.g. BL1-001-01"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Coordinates</Typography>
          </Grid>
          {coordinates &&
            coordinates.length > 0 &&
            coordinates.map((coord, index) => (
              <React.Fragment key={index}>
                {["x", "y"].map(field => (
                  <Grid item xs={6} key={field}>
                    <TextField
                      fullWidth
                      label={`${field.toUpperCase()}${index + 1}`}
                      value={coord[field]}
                      onChange={e => handleCoordinateChange(index, field, e.target.value)}
                      required
                    />
                  </Grid>
                ))}
                {index > 0 && (
                  <Grid item xs={12}>
                    <Button onClick={() => removeCoordinate(index)}>Remove</Button>
                  </Grid>
                )}
              </React.Fragment>
            ))}
          <Grid item xs={12}>
            <Button onClick={addCoordinate} fullWidth variant="outlined">
              Add Another Point
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              label="Description"
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <IPDCAttachFile1
              onChange={e => setAttachment(e[0])}
              label="Attach Order Dcoument"
              variant="outlined"
              multiLine={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Parcel Subdivide
            </Button>
          </Grid>
        </Grid>
      </form>
      {responseMessage && <IPDCToastMessageResult message={responseMessage} type={alertSeverity} />}
    </Paper>
  );
});

export default SplitForm;
