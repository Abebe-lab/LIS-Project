import { useContext, useEffect } from "react";
import { Attribution } from "ol/control";
import MapContext from "../Map/MapContext";

const AttributionControl = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let attributionControl = new Attribution({});

		map.controls.push(attributionControl);

		return () => map.controls.remove(attributionControl);
	}, [map]);

	return null;
};

export default AttributionControl;