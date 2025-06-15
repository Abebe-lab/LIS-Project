import { useContext, useEffect } from "react";
import  Overlay  from "ol/Overlay";
import MapContext from "../Map/MapContext";

const OverlayControl = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let overlayControl = new Overlay({});

		map.addOverlay(overlayControl);

		return () => map.removeOverlay(overlayControl);
	}, [map]);

	return null;
};

export default OverlayControl;