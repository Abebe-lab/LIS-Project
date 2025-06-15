import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
export const overlayStyle = (function () {
  const styles = {};
  styles["Polygon"] = [
    new Style({
      fill: new Fill({
        color: [0, 0, 255, 0.5],
      }),
    }),
    new Style({
      stroke: new Stroke({
        color: [255, 255, 255, 1],
        width: 5,
      }),
    }),
    new Style({
      stroke: new Stroke({
        color: [0, 153, 255, 1],
        width: 3,
      }),
    }),
  ];
  styles["MultiPolygon"] = styles["Polygon"];

  styles["LineString"] = [
    new Style({
      stroke: new Stroke({
        color: [255, 255, 255, 1],
        width: 5,
      }),
    }),
    new Style({
      stroke: new Stroke({
        color: [0, 153, 255, 1],
        width: 3,
      }),
    }),
  ];
  styles["MultiLineString"] = styles["LineString"];

  styles["Point"] = [
    new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: [0, 153, 255, 1],
        }),
        stroke: new Stroke({
          color: [255, 255, 255, 0.75],
          width: 1.5,
        }),
      }),
      zIndex: 100000,
    }),
  ];
  styles["MultiPoint"] = styles["Point"];

  styles["GeometryCollection"] = styles["Polygon"].concat(styles["Point"]);

  return function (feature) {
    return styles[feature.getGeometry().getType()];
  };
})();
