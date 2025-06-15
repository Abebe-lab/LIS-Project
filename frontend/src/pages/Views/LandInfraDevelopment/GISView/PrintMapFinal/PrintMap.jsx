import React from 'react';
import PrintableMap from './PrintableMap'; // Adjust path as needed
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { GeoJSON } from 'ol/format';
import "./PrintableMap.css";
import CommonLayers from '../MapRelated/Views/CommonLayers';

const PrintMap=()=>{

    const vectorLayer = new VectorLayer({
        source: new VectorSource({
            url: 'https://openlayers.org/en/latest/examples/data/geojson/london.json',
            format: new GeoJSON(),
        }),
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 165, 0, 0.6)', // Orange with transparency
            }),
            stroke: new Stroke({
                color: '#ff8c00', // Darker orange border
                width: 2,
            }),
        }),
        visible: true,
        title: 'London GeoJSON'
    });
const layers=CommonLayers();

    const mapLayers = [
        new TileLayer({
            source: new OSM(),
            visible: true,
            title: 'OpenStreetMap Base'
        }),
        vectorLayer,
    ];


    return (
        <div>
            <PrintableMap initialLayers={mapLayers} />
        </div>
    );
}

export default PrintMap;