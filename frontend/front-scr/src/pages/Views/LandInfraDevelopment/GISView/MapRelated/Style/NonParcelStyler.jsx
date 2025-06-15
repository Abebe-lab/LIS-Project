/**
 * Style function to style OpenLayers features based on shape type and other attributes.
 * @param {Object} feature - The feature to style.
 * @param {string} shapeType - The type of shape to apply (e.g., 'Point', 'Line', 'Polygon').
 * @param {boolean} showText - Flag to indicate if text should be shown.
 * @param {string} textFieldToShow - The field to display as text on the feature.
 * @param {string} textColor - The color of the text.
 * @param {string|null} shapeColor - The color of the shape. If null, uses `StringToColor`.
 * @param {number} opacity - The opacity level (0 to 1) for the fill and line colors.
 * @returns {Style} The style for the feature.
 */
import { Style, Fill, Stroke, Circle as CircleStyle, RegularShape, Text } from "ol/style";
import { measureAndLabelSidesOfGeometry, StringToColor } from "../Util/Util";
import * as turf from "@turf/turf";
import { Polygon } from "ol/geom";
// prettier-ignore
function getNonParcelFeatureStyle(feature, shapeColor = null, showText = true, textFieldToShow = "id", textColor = "white", opacity = 0.75, polygonBorder="grey", passedFontSize=12) {
  // Determine colors based on `shapeColor` or `StringToColor` function
  const color = shapeColor || StringToColor(feature?.get("feature"));
  const shapeType = feature?.getGeometry()?.getType();
  const fillColor = color;
  const lineColor = polygonBorder;

  // Text style if `showText` is true
  const text = showText ? getStyledText(feature, textFieldToShow, textColor, passedFontSize) : null;
  // Define style based on `shapeType`
  switch (shapeType) {
    case "Point":
      // Different shapes for points
      const pointShape = feature?.get("pointShape") || "circle"; // example shape: 'circle', 'square'
      if (pointShape === "square") {
        return new Style({
          image: new RegularShape({
            fill: new Fill({ color: fillColor, opacity: opacity  }),
            stroke: new Stroke({ color: polygonBorder, width: 2 }),
            points: 4,
            radius: 6,
            angle: Math.PI / 4, // rotate to make a square
          }),
          text: text,
        });
      } else {
        return new Style({
          image: new CircleStyle({
            fill: new Fill({ color: fillColor, opacity: opacity }),
            stroke: new Stroke({ color: lineColor, width: 2 }),
            radius: 6,
          }),
          text: text,
        });
      }

    case "LineString":
      return new Style({
        stroke: new Stroke({color: lineColor, width: 3}),
        text: text,
      });

    case "Polygon":
      return new Style({
        fill: new Fill({ color: fillColor, opacity: opacity}),
        stroke: new Stroke({ color: lineColor, width: 2, }),
        text: text,
      });

    default:
      // Default style if `shapeType` is unknown
      return new Style({
        stroke: new Stroke({ color: "gray", width: 1 }),
        text: text,
      });
  }
}

const getHatchedParcelFeatureStyle = (feature, selectedUpin = null, alsoHighight = false, showMeasurement = false) => {
  const featureUpin = feature?.get("upin");
  let text = featureUpin ? getStyledText(feature, "upin", "black", 12) : null;
  const isSelected = featureUpin === selectedUpin;
 
  const geometry = feature.getGeometry();
  let simplifiedGeometry = geometry;
   // Simplify the geometry if it's a polygon
   if (geometry.getType() === 'Polygon') {
    // Convert OpenLayers geometry to GeoJSON
    const geoJSONFeature = turf.polygon(geometry.getCoordinates());
    // Simplify the polygon
    const simplified = turf.simplify(geoJSONFeature, { tolerance: 1, highQuality: false });
    // Convert back to OpenLayers geometry
    simplifiedGeometry = new Polygon(simplified.geometry.coordinates);
  }
  let sideLabels = [];

  if (isSelected && geometry.getType() === 'Polygon' && showMeasurement) {
    sideLabels = measureAndLabelSidesOfGeometry(simplifiedGeometry,0);
  }

  return [
    new Style({
      fill: new Fill({ color: (isSelected && alsoHighight) ? "grey" : "white", opacity: 0.5 }),
      stroke: new Stroke({ color: isSelected ? "#5E67AF" : "black", width: (isSelected && !alsoHighight) ? 10 : alsoHighight ? 2 : 1 }),
      text: text
    }),
    ...sideLabels
  ];
};
// Example of `StringToColor` function

const getStyledText = (feature, textToDisplay, textColor = "white", passedFontSize = 12) => {
  const isWide = isFeatureWide(feature);
  try {
    const fontSize = passedFontSize || isWide ? 12 : 8; // Adjust font size based on width
    const padding = isWide ? 1 : 0.5; // Adjust padding based on width

    return new Text({
      font: `bold ${fontSize}px Calibri,sans-serif`,
      placement: "point",
      fill: new Fill({ color: textColor }),
      text: feature.get(textToDisplay) ? String(feature.get(textToDisplay)) : "",
      rotation: isWide ? 0 : Math.PI / 2, // Rotate 90 degrees for tall features
      textAlign: "center",
      stroke: new Stroke({ color: "black", width: 1 }),
      offsetX: padding, // Add offset to create padding
      offsetY: padding, // Add offset to create padding
    });
  } catch (error) {
    console.log(error);
    return new Style({
      stroke: new Stroke({ color: "gray", width: 1 }),
      text: textToDisplay,
    });
  }
};
const isFeatureWide = feature => {
  let isWide = false;
  try {
    const geometry = feature.getGeometry();
    const extent = geometry.getExtent();
    const width = extent[2] - extent[0];
    const height = extent[3] - extent[1];
    isWide = width > height;
    return isWide;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { getNonParcelFeatureStyle, getHatchedParcelFeatureStyle };
