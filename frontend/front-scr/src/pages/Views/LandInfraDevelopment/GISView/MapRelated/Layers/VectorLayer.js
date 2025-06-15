import { useContext, useEffect, forwardRef } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = forwardRef(({ source, style, zIndex = 0, title = "" }, ref) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style,
      title,
    });
    if (ref) ref.current = vectorLayer;
    //    console.log("vector layer title :",  title);
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
});

export default VectorLayer;
