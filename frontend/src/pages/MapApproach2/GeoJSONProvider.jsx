// GeoJSONProvider.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loadPark, loadBlocks, loadParcels,loadInfrastructure,loadGreenArea } from './MapDataLoader';
//,loadRoads,loadInfrastructure, loadGreenArea,   loadImportedFiles
const GeoJSONContext = createContext();

const loadAllGeoJSON = async () => {
  const layers = {
    park: await loadPark(),
    blocks: await loadBlocks(),
    parcels: await loadParcels(),
    roads: await loadInfrastructure(),
    greenAreas: await loadGreenArea(),
  //  roads: await loadRoads(),
//    infrastructure: await loadInfrastructure(),
//    greenArea: await loadGreenArea(),
   // importedFiles: await loadImportedFiles(),
  };
  return layers;
};

export const GeoJSONProvider = ({ children }) => {
  const [geojsonData, setGeojsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const data = await loadAllGeoJSON();
        setGeojsonData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJSON();
  }, []);

  return (
    <GeoJSONContext.Provider value={{ geojsonData, loading, error }}>
      {children}
    </GeoJSONContext.Provider>
  );
};

export const useGeoJSON = () => useContext(GeoJSONContext);
