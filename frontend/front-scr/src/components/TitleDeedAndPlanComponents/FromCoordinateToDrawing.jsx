import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import { Grid } from "@mui/material";
import CoordinateTable from "./CoordinateTable";

const FromCoordinateToDrawing = ({ polygonCoordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Calculate the extent of the polygon to set the map view
    const polygon = new Polygon([polygonCoordinates]);
    const extent = polygon.getExtent();

    const map = new Map({
      target: mapRef.current,
      layers: [
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: polygon,
              }),
            ],
          }),
        }),
      ],
      view: new View({
        projection: "EPSG:4326",
        center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
        extent: extent, // Set the extent to manually define the view's bounds
        constrainOnlyCenter: true, // This prevents zooming, only panning is allowed
        padding: [50, 50, 50, 50],
        resolution: Math.max(
          (extent[2] - extent[0]) / 500, // Width of the map divided by width of the container
          (extent[3] - extent[1]) / 400, // Height of the map divided by height of the container
        ),
      }),
    });

    return () => {
      map.dispose();
    };
  }, [polygonCoordinates]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <>
          {
            //<div ref={mapRef} style={{ width: "500px", height: "400px" }} />
            }
        </>
      </Grid>
      <Grid item xs={6}>
        <CoordinateTable coordinates={polygonCoordinates} />
      </Grid>
    </Grid>
  );
};

export default FromCoordinateToDrawing;
