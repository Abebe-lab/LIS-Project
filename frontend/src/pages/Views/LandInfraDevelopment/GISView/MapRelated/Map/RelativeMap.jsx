import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { Select } from "ol/interaction";

const RelativeMap = ({ children, zoom = null, center = [0, 0], extent = null }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapData, setMapData] = useState({
    zoom: zoom,
    center,
    selectedFeatures: [],
    visibleLayers: [],
    extent: null,
    view: null,
  });

  // Initialize the map when the component mounts
  useEffect(() => {
    let viewOptions = {};
    if (zoom !== null) {
      viewOptions = { zoom, center };
    } else if (extent) {
      viewOptions = { extent };
    } else {
      viewOptions = { zoom: 15, center }; // Default zoom if neither zoom nor extent is provided
    }
    const mapObject = new ol.Map({
      view: new ol.View(viewOptions),
      layers: [],
      controls: [],
      overlays: [],
    });

    mapObject.setTarget(mapRef.current);

    // Update map data when map moves or layers change
    const updateData = () => updateMapData(mapObject);
    mapObject.on("moveend", updateData);
    mapObject.on("change:layer", updateData);

    setMap(mapObject);
    return () => {
      mapObject.setTarget(undefined);
      mapObject.un("moveend", updateData);
      mapObject.un("change:layer", updateData);
    };
  }, [zoom, center, extent]);

  // Update center when props change, only if zoom is null and no extent is provided
  useEffect(() => {
    if (map && zoom === null && !extent) map.getView().setCenter(center);
  }, [center, map, zoom, extent]);

  // Update zoom when props change, only if zoom is provided
  useEffect(() => {
    if (map && zoom !== null) map.getView().setZoom(zoom);
  }, [zoom, map]);

  // Update extent when props change, only if extent is provided and zoom is null
  useEffect(() => {
    if (map && extent && zoom === null) {
      map.getView().fit(extent, map.getSize());
    }
  }, [extent, map, zoom]);

  // Update map data
  const updateMapData = mapObject => {
    if (!mapObject) return;

    const view = mapObject.getView();
    const currentExtent  = view.calculateExtent(mapObject.getSize());

    setMapData(prev => ({
      ...prev,
      zoom: view.getZoom(),
      center: view.getCenter(),
      selectedFeatures: getSelectedFeatures(mapObject),
      visibleLayers: getVisibleLayers(mapObject.getLayers().getArray()),
      extent: currentExtent,
      view,
    }));
  };

  // Helper: Get selected features from interactions
  const getSelectedFeatures = mapObject => {
    const features = [];
    mapObject.getInteractions().forEach(interaction => {
      if (interaction instanceof Select) {
        features.push(...interaction.getFeatures().getArray());
      }
    });
    return features;
  };

  // Helper: Get visible layers
  const getVisibleLayers = layers =>
    layers
      .filter(layer => layer.getVisible())
      .map(layer => ({
        id: layer?.get("id"),
        name: layer?.get("name"),
        type: layer?.get("type"),
        visible: layer?.getVisible(),
        opacity: layer?.getOpacity(),
      }));

  // Context value for sharing map-related functionality
  const mapContextValue = {
    map,
    mapData,
    updateMapData: () => updateMapData(map),
    getSelectedFeatures: () => getSelectedFeatures(map),
    getVisibleLayers: () => getVisibleLayers(map?.getLayers().getArray() || []),
    getCurrentExtent: () => map?.getView().calculateExtent(map.getSize()),
  };

  return (
    <MapContext.Provider value={mapContextValue}>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%", padding: 0, margin: 0, position: "relative" }}>
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default RelativeMap;
