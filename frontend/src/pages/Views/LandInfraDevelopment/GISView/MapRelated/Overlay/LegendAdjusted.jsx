import { useContext, useEffect, useState } from "react";
import MapContext from "../Map/MapContext";
import Legend from 'ol-ext/control/Legend';
import LayerSwitcher from "ol-ext/control/LayerSwitcher";

const LegendControl = ({ items }) => {
  const { map } = useContext(MapContext);
  const [legend, setLegend] = useState(null);

  useEffect(() => {
    if (!map) return;

    const createLegend = () => {
      const newLegend = new Legend({
        title: 'Legend',
        margin: 5,
        collapsed: false,
      });
      setLegend(newLegend);
      map.addControl(newLegend);

      const layerSwitcher = new LayerSwitcher({
        target: newLegend.element,
        collapsed: false,
        extent: true,
      });
      map.addControl(layerSwitcher);

      return () => {
        map.removeControl(newLegend);
        map.removeControl(layerSwitcher);
      };
    };

    // Wait for the first render cycle
    const timeoutId = setTimeout(createLegend, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [map]);

  useEffect(() => {
    if (!legend || !items) return;

    items.forEach(item => {
      legend.addRow({
        title: item.title,
        typeGeom: item.typeGeom || 'Point',
        style: item.style,
      });
    });
  }, [legend, items]);

  return null;
};

export { LegendControl };