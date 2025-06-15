import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const regions = [
	{ key: "AA", label: "Addis Ababa City" },
	{ key: "AF", label: "Afar Region" },
	{ key: "AM", label: "Amhara Region" },
	{ key: "BG", label: "Benishangul-Gumuz Region" },
	{ key: "DD", label: "Dire Dawa City" },
	{ key: "GA", label: "Gambela Region" },
	{ key: "HR", label: "Harari Region" },
	{ key: "OM", label: "Oromia Region" },
	{ key: "SI", label: "Sidama Region" },
	{ key: "SO", label: "Somali Region" },
	{ key: "SW", label: "SWEP Region" },
	{ key: "SN", label: "SNNP Region" },
	{ key: "TG", label: "Tigray Region" },
];
export default function EthiopianRegions({ selectedRegion, setSelectedRegion }) {
	const [selectedRegionKey, setSelectedRegionKey] = useState(selectedRegion);

	useEffect(() => {
		setSelectedRegion(selectedRegionKey);
		console.log(selectedRegionKey);
	}, [selectedRegionKey, setSelectedRegion]);

	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={regions}
			getOptionLabel={(option) => option.label}
			value={regions.find((option) => option.key === selectedRegionKey) || null}
			onChange={(event, newValue) => {
				setSelectedRegionKey(newValue ? newValue.key : null);
			}}
			renderInput={(params) => <TextField {...params} label="Select Region" />}
		/>
	);
}
