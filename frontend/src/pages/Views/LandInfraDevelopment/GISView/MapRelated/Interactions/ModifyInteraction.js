import { useContext, useEffect } from "react";
import { Select, Modify } from "ol/interaction";//Sanp missing
import GeoJSON from "ol/format/GeoJSON";
import MapContext from "../Map/MapContext";

// target can be features, a source or a layer
const ModifyInteraction = ({setFeatureToModify}) => {
	const { map } = useContext(MapContext);
	console.log('modification called')
	useEffect(() => {
		if (!map) return;
		console.log('modification started')
		let modifyInteraction = new Modify({
			features: new Select({}).getFeatures(), // Use Select to get features for Modify
			// ... other Modify options
		});
		console.log('modification on')
		modifyInteraction.on('modifyend', (event) => {
			const modifiedFeatures = event.features.getArray(); // Access modified features
			setFeatureToModify(modifiedFeatures.length > 0 ? modifiedFeatures : null);
			if(map){
				//SHOW THE POPUP
				//setSelectedFeature(selectedFeatures ? selectedFeatures: null);
				var format = new GeoJSON();
							var geojson1 = format.writeFeaturesObject([
								modifiedFeatures[0],
							]);
							console.log(geojson1.features[0].geometry.coordinates);
			}
		});
		console.log('modification ended')
		map.interactions.push(modifyInteraction);

		return () => map.interactions.remove(modifyInteraction);
	}, []);

	return null;
};

export default ModifyInteraction;
