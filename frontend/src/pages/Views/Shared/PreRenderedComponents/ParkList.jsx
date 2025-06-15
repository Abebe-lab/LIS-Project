import { useEffect, useState } from "react";
import { GetParks } from "../CommonData/CommonData";
import { Autocomplete, TextField } from "@mui/material";

export default function ParkList({ selectedPark, setSelectedPark, isRequired = true }) {
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      const prk=await GetParks();
      setParksData(prk);
    };
    fetchParks();
  }, []);

  return (
    <>
      <Autocomplete
        fullWidth={true}
        options={parksData}
        getOptionLabel={(option) => option.name}
        value={selectedPark}
        onChange={(event, newValue) => {
          setSelectedPark(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select a Park" variant="outlined" required={isRequired}/>
        )}
      />
    </>
  );
}
