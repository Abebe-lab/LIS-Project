// EditMap.jsx
import React from 'react';
import ViewMap from './ViewMap';
import { GeoJSONProvider, useGeoJSON } from './GeoJSONProvider';

const MapWithLayers = () => {
  const { geojsonData, loading, error } = useGeoJSON();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <ViewMap geojsonData={geojsonData} />;
};

const EditMap2 = () => (
  <GeoJSONProvider>
    <MapWithLayers />
  </GeoJSONProvider>
);

export default EditMap2;
