import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { GetParcelsInPark, GetAvailableParcelsInPark } from "../CommonData/CommonData";

export default function ParcelsInParkList({ parkId, selectedParcel, setSelectedParcel, availableOnly = true }) {
  const [parcelData, setParcelData] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      if (parkId && availableOnly) {
        const availableParcels = await GetAvailableParcelsInPark(parkId, false);
        setParcelData(availableParcels);
      } else if (parkId) {
        const parcelData = await GetParcelsInPark(parkId, false);
        setParcelData(parcelData);
      }
      console.log(parcelData);
      if (parcelData && availableOnly) {
        console.log(parcelData);
        //const filteredParcels = parcelData.filter((parcel) => parcel.available === true);
        //setParcelData(filteredParcels);
      }
    };
    fetchParcels();
  }, []);

  const handleParkChange = (e) => {
    const selectedParcelUPIN = e.target.value;
    const selectedParcel = parcelData.find((parcel) => parcel.upin === selectedParcelUPIN);
    setSelectedParcel(selectedParcel);
  };

  return (
    <>
      {parcelData ? (
        <FormControl fullWidth={true}>
          <InputLabel id="parcel-label">Select a UPIN</InputLabel>
          <Select
            labelId="parcel-label"
            id="parcel_id"
            name="parcel_id"
            color="info"
            value={selectedParcel ? selectedParcel.upin : ""}
            onChange={handleParkChange}
            fullWidth={true}
          >
            {parcelData?.map((parcel) => (
              <MenuItem key={parcel?.upin} value={parcel?.upin}>
                {parcel?.upin}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth={true}>
          <InputLabel id="parcel-label">Select a UPIN</InputLabel>
        </FormControl>
      )}
    </>
  );
}
