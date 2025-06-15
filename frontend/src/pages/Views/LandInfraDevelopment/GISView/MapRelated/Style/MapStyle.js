import { Style, Text, Fill, Stroke } from "ol/style";
import LAYER_COLORS from "../Util/LAYER_COLORS";

const parkStyle = new Style({
  fill: new Fill({ color: LAYER_COLORS.PARK.color }),
  stroke: new Stroke({ color: LAYER_COLORS.PARK.border, width: 3 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
const blockStyle = new Style({
  fill: new Fill({ color: LAYER_COLORS.BLOCK.color}),
  stroke: new Stroke({ color: LAYER_COLORS.BLOCK.border, width: 1 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
const parcelStyle = new Style({
  fill: new Fill({ color: "rgba(245, 245, 220, 0.5)" }),
  stroke: new Stroke({ color: "#888c8f", width: 1 }),
  text: new Text({
    font: 'bold 12px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "#0b5394" }),
  }),
});
const vacantParcelStyle = new Style({
  fill: new Fill({ color: "lightgreen" }), // Adjust color for vacant
  stroke: new Stroke({ color: "#888c8f", width: 1 }),
  text: new Text({
    font: 'bold 12px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "#0b5394" }),
  }),
});

const occupiedParcelStyle = new Style({
  fill: new Fill({ color: "coral" }), // Adjust color for occupied
  stroke: new Stroke({ color: "#888c8f", width: 1 }),
  text: new Text({
    font: 'bold 12px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "#0b5394" }),
  }),
});
const infraStyle = new Style({
  fill: new Fill({ color: [0, 0, 0, 0.5] }),
  //fill: new Fill({ color: '#ffe15f' }),
  stroke: new Stroke({ color: "black", width: 0.5 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
const greenStyle = new Style({
  fill: new Fill({ color: LAYER_COLORS.GREEN_AREA.color }),
  stroke: new Stroke({ color: LAYER_COLORS.GREEN_AREA.border, width: 1 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
const greenStyle_forest = new Style({
  fill: new Fill({ color: LAYER_COLORS.GREEN_AREA_FOREST.color }),
  stroke: new Stroke({ color: LAYER_COLORS.GREEN_AREA_FOREST.border, width: 1 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
const newPlot = new Style({
  fill: new Fill({ color: LAYER_COLORS.NEW_PLOT.color }),
  //fill: new Fill({ color: '#ffe15f' }),
  stroke: new Stroke({ color: LAYER_COLORS.NEW_PLOT.border, width: 0.5 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
const wasteDisposalStyle = new Style({
  fill: new Fill({ color: LAYER_COLORS.WASTE.color }),
  //fill: new Fill({ color: '#ffe15f' }),
  stroke: new Stroke({ color: LAYER_COLORS.WASTE.border, width: 0.5 }),
  text: new Text({
    font: 'bold 11px "open sans", "Arial Unicode Ms","sans-serif"',
    placement: "point",
    fill: new Fill({ color: "white" }),
  }),
});
export {
  parkStyle,
  blockStyle,
  greenStyle,
  greenStyle_forest,
  infraStyle,
  parcelStyle,
  vacantParcelStyle,
  occupiedParcelStyle,
  newPlot,
  wasteDisposalStyle,
};
/**
 var parcelLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    // ... your parcel features with "function" attribute
  }),
  style: parcelStyle
});
var parcelStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'black',
    width: 1
  }),
  fill: new ol.style.Fill({
    color: function(feature) {
      return getParcelColor(feature);
    }
  })
});
function getParcelColor(feature) {
  var functionValue = feature.get('function');
  switch (functionValue) {
    case 'residential':
      return 'blue';
    case 'commercial':
      return 'green';
    case 'industrial':
      return 'orange';
    default:
      return 'gray'; // Default color for unknown functions
  }
}
 */
/*** fetaure by occupancy
 
function getParcelColor(feature) {
  var occupancyValue = feature.get('occupancy');
  switch (occupancyValue) {
    case 'Occupied':
      return 'green';
    case 'Vacant':
      return 'red';
    case 'Under Construction':
      return 'orange';
    default:
      return 'gray'; // Default color for unknown occupancy
  }
}

var parcelStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'black',
    width: 1
  }),
  fill: new ol.style.Fill({
    color: function(feature) {
      return getParcelColor(feature);
    }
  }),
  text: new ol.style.Text({
    text: '', // Placeholder for parcel label
    fill: new ol.style.Fill({
      color: 'white'
    }),
    font: '12px Calibri, sans-serif' // Customize font if desired
  })
});


 */
