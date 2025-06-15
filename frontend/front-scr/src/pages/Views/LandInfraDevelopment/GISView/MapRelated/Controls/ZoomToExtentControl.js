import { useContext, useEffect } from "react";
import { ZoomToExtent } from "ol/control";
import MapContext from "../Map/MapContext";

const ZoomToExtentControl = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let zoomToExtentControl = new ZoomToExtent({});

		map.controls.push(zoomToExtentControl);

		return () => map.controls.remove(zoomToExtentControl);
	}, [map]);

	return null;
};

export default ZoomToExtentControl;