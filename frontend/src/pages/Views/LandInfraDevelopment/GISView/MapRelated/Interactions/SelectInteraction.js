import { useContext, useEffect } from "react";
import { Select } from "ol/interaction";
import MapContext from "../Map/MapContext";
//import GeoJSON from "ol/format/GeoJSON";
//import ShowParcelInfoDialog from "../ShowParcelInfoDialog";


const SelectInteraction = ({setSelectedFeature, showPopup=false}) => {
	const { map } = useContext(MapContext);
	useEffect(() => {
		if (!map) return;

		let selectInteraction = new Select({});
		
		selectInteraction.on('select', (event) => {
		  const selectedFeatures = event?.selected;// Access selected features here//  console.log(selectedFeatures);

			setSelectedFeature(selectedFeatures ? selectedFeatures: null);
			if(showPopup){
				return
//				<ShowParcelInfoDialog />
//console.log(selectedFeatures);
			//	var format = new GeoJSON();
							/*var geojson1 = format.writeFeaturesObject([
								event?.selected[0],
							]);*/
			}
		});
		map.interactions.push(selectInteraction);

		return () => map.interactions.remove(selectInteraction);
	}, [map]);

	return null;
};

export default SelectInteraction;