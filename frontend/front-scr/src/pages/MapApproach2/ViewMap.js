// ViewMap.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createStyle } from './MapStyle';
import { Grid, Button} from '@mui/material';
import ParkList from '../Views/Shared/PreRenderedComponents/ParkList';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import {Vector as VectorSource } from 'ol/source';
//import { Tile as TileLayer} from 'ol/layer';
//import { OSM} from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import { Modify, Select } from 'ol/interaction';
import { ScaleLine, ZoomSlider } from 'ol/control';
import Popup from './Popup';
import "./map-container.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../Views/LandInfraDevelopment/GISView/MapRelated/Util/Util";

const ViewMap = ({ geojsonData }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [layers, setLayers] = useState({});
  const [selectedFeature, setSelectedFeature] = useState(null);
	const [selectedPark, setSelectedPark] = useState(null);
	
  const [center, setCenter] = useState(DEFAULT_CENTER);

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      /*layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],*/
      view: new View({
        center: center,
        zoom: DEFAULT_ZOOM,
      }),
    });

    initialMap.addControl(new ScaleLine());
    initialMap.addControl(new ZoomSlider());

    setMap(initialMap);

    return () => {
      initialMap.setTarget(null);
    };
  }, [center]);

  useEffect(() => {
    if (map && geojsonData) {
      const newLayers = {};

      for (const [key, data] of Object.entries(geojsonData)) {
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(data, {
            featureProjection: 'EPSG:3857',
          }),
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        const modifyInteraction = new Modify({
          source: vectorSource,
        });

        map.addLayer(vectorLayer);
        map.addInteraction(modifyInteraction);

        newLayers[key] = { layer: vectorLayer, interaction: modifyInteraction };
      }

      const selectInteraction = new Select({
        style: (feature) => createStyle(feature),
      });
      map.addInteraction(selectInteraction);

      selectInteraction.on('select', (event) => {
        const selected = event.selected[0];
        setSelectedFeature(selected ? selected : null);
      });

      setLayers(newLayers);
    }
  }, [map, geojsonData]);

  const toggleLayer = (layerKey) => {
    if (layers[layerKey]) {
      const { layer, interaction } = layers[layerKey];
      const visible = !layer.getVisible();
      layer.setVisible(visible);
      interaction.setActive(visible);
    }
  };
	const handleGoToPark = () => {
		if (selectedPark === null || selectedPark.id === "") return;
		console.log(center);
		const newCenter = fromLonLat(selectedPark.center_of_park.coordinates);
		console.log("newCenter:" + newCenter);
		if (newCenter) {
			setCenter(newCenter);
		}
	};

  return (
    <div className="app-container" style={{ height: '90vh', width: '100%' }} >
      <Grid container md={6} p={0} m={0}>
					<Grid item xs={12} md={6}>
						<ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Button m={1} onClick={handleGoToPark} variant="contained" color="primary"  fullWidth={true}>
							Go To Park
						</Button>
					</Grid>
				</Grid>
      <div ref={mapRef} className="map-container"/>
      <div style={{ height: '10%', overflow: 'auto' }}>
        {Object.keys(layers).map((key) => (
          <div key={key}>
            <input
              type="checkbox"
              checked={layers[key]?.layer.getVisible() || false}
              onChange={() => toggleLayer(key)}
            />
            {geojsonData[key]?.label || key}
          </div>
        ))}
      </div>
      {selectedFeature && (
        <div className="popup-container">
          <Popup feature={selectedFeature} />
        </div>
      )}
    </div>
  );
};

export default ViewMap;
