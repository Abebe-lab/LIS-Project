//================== GETTING GEOJSON FILE ON DB TO BE CORRECTLY PROJECTED
import { vector } from "../Source";
import { Style, Text, Fill, Stroke } from "ol/style";

import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, get } from "ol/proj";
import { LineString, Point } from "ol/geom";
//-------------------'FROM 'EPSG:4326' TO "EPSG:3857" FOR OPENLAYERS
const getProjectedVector = unProjected => {
  //console.log(unProjected)
  return vector({
    features: new GeoJSON()?.readFeatures(unProjected, {
      featureProjection: get("EPSG:3857"),
      dataProjection: "EPSG:4326",
    }),
  });
};
const getProjectedFromAdindan = unProjected => {
  //console.log("park boundary with adindan")
  //console.log(unProjected)
  return vector({
    features: new GeoJSON().readFeatures(unProjected, {
      featureProjection: get("EPSG:3857"),
      dataProjection: "EPSG:4326",
    }),
  });
};
const getVectorUnaltered = unProjected => {
  return vector({
    features: new GeoJSON().readFeatures(unProjected),
  });
};
//================== END GETTING GEOJSON FILE ON DB TO BE CORRECTLY PROJECTED
//================== GETTING STYLING TO DISPLAY TEXT OR NOT AND WHAT TO DISPLAY

const getSelectedParcelStyle = (feature, showText = true) => {
  try {
    const occupancyStatus = feature.get("occupancy_status");
    const upin = feature.get("upin");
    const txtFormat = new Text({
      font: 'bold 12px "open sans", "Arial Unicode Ms","sans-serif"',
      placement: "point",
      fill: new Fill({ color: occupancyStatus === "Vacant" ? "white" : "yellow" }),
      text: upin,
    });
    const stl = new Style({
      fill: occupancyStatus === "Vacant" ? new Fill({ color: "orange" }) : new Fill({ color: "Green" }),
      stroke: new Stroke({ color: "#888c8f", width: 1 }),
      text: showText ? txtFormat : null,
    });
    return stl;
  } catch (err) {
    console.log(err);
  }
};
const getSelectedStyle = (styleFormat, showText = false, fieldToDisplay = "id") => {
  if (showText)
    return function (feature) {
      styleFormat.getText().setText(feature.get(fieldToDisplay));
      return styleFormat;
    };
  else return styleFormat;
};
//================== END GETTING STYLING TO DISPLAY TEXT OR NOT AND WHAT TO DISPLAY
//================== GET MAP CETNER and DEFAULT MAP ZOOM LEVEL
const DEFAULT_CENTER = fromLonLat([38.856833, 8.969648]);
const DEFAULT_ZOOM = 16;
const ZOOM_EXTENT = null;
const getCenterFromFeature = feature => {
  if (!feature || !feature.geometry) return null;
  try {
    const calculatedExtent = getExtentFromFeature(feature);
    console.log("Calculated extent: ", calculatedExtent);
    if (calculatedExtent) {
      // Calculate the center of the feature based on the extent
      const [minX, minY, maxX, maxY] = calculatedExtent;
      return fromLonLat([(minX + maxX) / 2, (minY + maxY) / 2]);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
//===================END GET DEFAULT MAP ZOOM LEVEL
//====================START GET EXTENT FROM FEATURE
const getExtentFromFeature = feature => {
  // Check if feature exists and has a geometry property
  if (!feature || !feature.geometry) return null;
  try {
    const coords = feature.geometry.coordinates;
    let minX, maxX, minY, maxY;

    // Handle different geometry types
    if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
      const polygonCoords = feature.geometry.type === "Polygon" ? [coords] : coords;

      polygonCoords.forEach(polygon => {
        polygon.forEach(ring => {
          ring.forEach(point => {
            if (minX === undefined || point[0] < minX) minX = point[0];
            if (maxX === undefined || point[0] > maxX) maxX = point[0];
            if (minY === undefined || point[1] < minY) minY = point[1];
            if (maxY === undefined || point[1] > maxY) maxY = point[1];
          });
        });
      });
    } else if (feature.geometry.type === "LineString" || feature.geometry.type === "MultiLineString") {
      const lineCoords = feature.geometry.type === "LineString" ? [coords] : coords;

      lineCoords.forEach(line => {
        line.forEach(point => {
          if (minX === undefined || point[0] < minX) minX = point[0];
          if (maxX === undefined || point[0] > maxX) maxX = point[0];
          if (minY === undefined || point[1] < minY) minY = point[1];
          if (maxY === undefined || point[1] > maxY) maxY = point[1];
        });
      });
    } else if (feature.geometry.type === "Point") {
      minX = maxX = coords[0];
      minY = maxY = coords[1];
    } else if (feature.geometry.type === "MultiPoint") {
      coords.forEach(point => {
        if (minX === undefined || point[0] < minX) minX = point[0];
        if (maxX === undefined || point[0] > maxX) maxX = point[0];
        if (minY === undefined || point[1] < minY) minY = point[1];
        if (maxY === undefined || point[1] > maxY) maxY = point[1];
      });
    } else {
      console.warn("Unsupported geometry type:", feature.geometry.type);
      return null;
    }

    // Return the extent as a bounding box [minX, minY, maxX, maxY]
    return [minX, minY, maxX, maxY];
  } catch (error) {
    console.log(error);
    return null;
  }
};
//====================END GET EXTENT FROM FEATURE
// Function to measure, label sides, and draw lines, considering collinear segments
const measureAndLabelSidesOfGeometryWithCollinear = geometry => {
  // Helper function to check if three points are collinear
  const arePointsCollinear = (p1, p2, p3) => {
    // Check if the cross product of vectors p1p2 and p1p3 is zero (or close to zero due to floating point precision)
    const crossProduct = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
    return Math.abs(crossProduct) < 0.000001; // Small epsilon for floating point comparison
  };
  const coordinates = geometry.getCoordinates()[0];
  const styles = [];
  let totalDistance = 0;
  let startPoint = null;

  for (let i = 0; i < coordinates.length; i++) {
    const currentPoint = coordinates[i];
    const nextPoint = coordinates[(i + 1) % coordinates.length];

    // Check if this is the start of a new segment or continuation of a collinear segment
    if (startPoint === null) {
      startPoint = currentPoint;
      totalDistance = 0;
    }

    const dx = nextPoint[0] - currentPoint[0];
    const dy = nextPoint[1] - currentPoint[1];
    const segmentDistance = Math.sqrt(dx * dx + dy * dy);
    totalDistance += segmentDistance;

    // Check if the next segment continues the line (collinearity check)
    const nextNextPoint = coordinates[(i + 2) % coordinates.length];
    const isCollinear = arePointsCollinear(currentPoint, nextPoint, nextNextPoint);

    // If not collinear or it's the last segment, we finalize the measurement
    if (!isCollinear || i === coordinates.length - 1) {
      if (totalDistance >= 10) {
        const label = `${totalDistance.toFixed(2)}m`;
        const midpoint = [(startPoint[0] + nextPoint[0]) / 2, (startPoint[1] + nextPoint[1]) / 2];

        // Calculate an offset point outside the polygon for label
        const offset = 10; // Adjust this value to move labels further out
        const labelOffset = [
          midpoint[0] + (dx / segmentDistance) * offset,
          midpoint[1] + (dy / segmentDistance) * offset,
        ];

        // Add line style to show the measured distance
        styles.push(
          new Style({
            stroke: new Stroke({ color: "black", width: 1 }),
            geometry: new LineString([startPoint, nextPoint]),
          }),
        );

        // Add small lines at the ends to mimic the style in the image
        styles.push(
          new Style({
            stroke: new Stroke({ color: "black", width: 1 }),
            geometry: new LineString([
              startPoint,
              [startPoint[0] + (dx / segmentDistance) * 5, startPoint[1] + (dy / segmentDistance) * 5],
            ]),
          }),
        );
        styles.push(
          new Style({
            stroke: new Stroke({ color: "black", width: 1 }),
            geometry: new LineString([
              nextPoint,
              [nextPoint[0] - (dx / segmentDistance) * 5, nextPoint[1] - (dy / segmentDistance) * 5],
            ]),
          }),
        );

        // Add label outside the polygon
        styles.push(
          new Style({
            geometry: new Point(labelOffset),
            text: new Text({
              text: label,
              font: "12px Calibri,sans-serif",
              fill: new Fill({ color: "black" }),
              stroke: new Stroke({ color: "white", width: 2 }),
              offsetX: 0, // Adjust if necessary
              offsetY: 0, // Adjust if necessary
            }),
          }),
        );
      }
      // Reset for the next segment
      startPoint = null;
    }
  }
  return styles;
};
// Function to measure, label sides, and draw lines
const measureAndLabelSidesOfGeometry = (geometry, rounding = 2, toleranceMeasurement = 10) => {
  const coordinates = geometry.getCoordinates()[0];
  const styles = [];

  for (let i = 0; i < coordinates.length; i++) {
    const start = coordinates[i];
    const end = coordinates[(i + 1) % coordinates.length]; // Loop back to first point for last segment
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Omit labels for distances less than 1 meter
    if (distance >= toleranceMeasurement) {
      const label = `${distance.toFixed(rounding)}m`;

      // Calculate midpoint for label placement
      const midpoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

      // Calculate an offset point inside the polygon for label
      const offset = -10; // Negative to move inside, adjust this value as needed
      const normalVector = [-dy / distance, dx / distance]; // Normal vector to the segment
      const labelOffset = [midpoint[0] + normalVector[0] * offset, midpoint[1] + normalVector[1] * offset];
      /*
      // Add line style to show the measured distance
      styles.push(new Style({
        stroke: new Stroke({ color: 'black', width: 1 }),
        geometry: new LineString([start, end])
      }));

      // Add small lines at the ends to mimic the style in the image
      styles.push(new Style({
        stroke: new Stroke({ color: 'black', width: 1 }),
        geometry: new LineString([start, [start[0] + (dx / distance) * 5, start[1] + (dy / distance) * 5]])
      }));
      styles.push(new Style({
        stroke: new Stroke({ color: 'black', width: 1 }),
        geometry: new LineString([end, [end[0] - (dx / distance) * 5, end[1] - (dy / distance) * 5]])
      }));

      // Calculate points where the lines should start from the sides
      const startLinePoint = [start[0] + (dx / distance) * 5, start[1] + (dy / distance) * 5];
      const endLinePoint = [end[0] - (dx / distance) * 5, end[1] - (dy / distance) * 5];

      // Draw a single line from the midpoint of the segment to the label, but starting from the sides
      styles.push(new Style({
        stroke: new Stroke({ color: 'black', width: 1 }),
        geometry: new LineString([startLinePoint, labelOffset, endLinePoint])
      }));
*/
      // Add label inside the polygon
      styles.push(
        new Style({
          geometry: new Point(labelOffset),
          text: new Text({
            text: label,
            font: "12px Calibri,sans-serif",
            fill: new Fill({ color: "black" }),
            stroke: new Stroke({ color: "white", width: 2 }),
            offsetX: 0,
            offsetY: 0,
          }),
        }),
      );
    }
  }
  return styles;
};

function StringToColor(inputString) {
  // This function generates a color based on the input string (e.g., feature property)
  // Here, we return a simple hash-based color.
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString?.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `#${((hash >> 24) & 0xff)?.toString(16)?.padStart(2, "0")}${((hash >> 16) & 0xff)
    ?.toString(16)
    ?.padStart(2, "0")}${((hash >> 8) & 0xff)?.toString(16)?.padStart(2, "0")}`;
  return color;
}
export {
  getProjectedVector,
  getProjectedFromAdindan,
  getVectorUnaltered,
  getSelectedParcelStyle,
  getSelectedStyle,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  ZOOM_EXTENT,
  getExtentFromFeature,
  getCenterFromFeature,
  measureAndLabelSidesOfGeometry,
  measureAndLabelSidesOfGeometryWithCollinear,
  StringToColor,
};
