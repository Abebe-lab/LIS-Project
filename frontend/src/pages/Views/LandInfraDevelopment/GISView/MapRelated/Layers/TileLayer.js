import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";
import { OSM as osm } from "ol/source";
const TileLayer = ({ source, zIndex = 0,title="Satelite Image" }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let tileLayer = new OLTileLayer({
			visible: true,
			source: new osm({ title: "OpenStreetMap" }),
			zIndex,
		});
		tileLayer.set('title','OpenStreetMap');
		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [map]);

	return null;
};

export default TileLayer;
