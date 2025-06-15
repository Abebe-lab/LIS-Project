// src/components/PrintPreview.js
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ScaleLine from 'ol/control/ScaleLine';
import Rotate from 'ol/control/Rotate';
import html2canvas from 'html2canvas';
import { DEFAULT_CENTER } from '../Util/Util';

const PrintPreview = ({ scale, paperSize, orientation }) => {
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      const map = new Map({
        target: previewRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: DEFAULT_CENTER,
          zoom: getZoomFromScale(scale),
        }),
        controls: [
          new ScaleLine(), // Adds a scale bar
          new Rotate(), // Adds a north arrow
        ],
      });

      return () => {
        map.setTarget(null);
      };
    }
  }, [scale, paperSize, orientation]);

  const getZoomFromScale = (scale) => {
    const scales = [591657550.5, 295828775.25, 147914387.625, 73957193.8125, 36978596.90625];
    return scales.findIndex((s) => s >= scale) || scales.length - 1;
  };

  const handlePrint = async () => {
    const canvas = await html2canvas(previewRef.current);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'map-preview.png';
    link.click();
  };

  return (
    <div>
      <h2>Preview</h2>
      <div ref={previewRef} style={{ width: '100%', height: '300px' }} />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <strong>Title: My Custom Map</strong>
      </div>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <em>Legend: Add your legend here</em>
      </div>
      <button onClick={handlePrint} style={{ display: 'block', margin: '10px auto' }}>
        Print Map
      </button>
    </div>
  );
};

export default PrintPreview;