import React, { useEffect, useState, useRef } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box } from "@mui/material";
import ParkList from "../../Shared/PreRenderedComponents/ParkList";
import FormContainer from "../../../../components/Forms/FormContainer";
import { ExecutePostWithParams, GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
import { IPDCAttachFileWithReset } from "../../../../components/Controls";
function PlaceParcelOnHold({ filterAvailableOnly = false }) {
  //  const decodedUser = useDecodedUser();
  const [selectedPark, setSelectedPark] = useState(null);
  const [parcelInPark, setParcelInPark] = useState([]);
  const [selectedUpin, setSelectedUpin] = useState(null);
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef();
  //  const [parcelsToshow, setParcelsToshow] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchUPIN = async parkId => {
      try {
        const responseData = await GetDataFromApiWithParams(`availableParcelsInPark/${parkId}`);
        if (responseData) {
          let finalData = responseData;
          console.log(finalData);
          if (filterAvailableOnly) {
            finalData = finalData.filter(item => item.status !== "reserved" && item.status === "Operational");
          }
          setParcelInPark(finalData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedPark) {
      fetchUPIN(selectedPark.id);
      //console.log(selectedPark.id);
    }
  }, [selectedPark, filterAvailableOnly]);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    console.log("attachment",attachment);
    formData.append("upin", selectedUpin);
    formData.append("description", description);
    //formData.append("attachment", attachment);
    formData.append("file", attachment);

    try {
      const responseData = await ExecutePostWithParams(`parcels/${selectedUpin}/placeOnHold`, formData,true);
      //console.log(responseData);
      if (responseData) {
        setMessage(<Typography sx={{ color: "green" }}>Parcel placed on hold successfully!</Typography>);
        setSelectedPark(null);
        setSelectedUpin(null);
        setDescription("");
        setAttachment(null);
        //        setParcelsToshow(null);
        setParcelInPark([]);
        if (fileInputRef.current) {
          fileInputRef.current.reset();
        }
        //console.log(response.data);
      }
    } catch (error) {
      setMessage(<Typography sx={{ color: "red" }}>Something went wrong, Please try again!</Typography>);
      console.log(error);
    }
  };

  return (
    <FormContainer title={"Reserve Parcel"} onSubmit={handleSubmit} buttonLabel="Reserve Parcel">
      <Grid item md={12}>
        <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <InputLabel id="upin_no-label">Parcel UPIN</InputLabel>
          <Select
            labelId="upin_no-label"
            id="upin"
            name="upin"
            value={selectedUpin}
            onChange={e => setSelectedUpin(e.target.value)}
            defaultValue={parcelInPark?.length > 0 ? parcelInPark[0]?.upin : ""}
            required={true}
          >
            <MenuItem value="">
              <em>Select Parcel UPIN</em>
            </MenuItem>
            {parcelInPark &&
              parcelInPark?.map(parcel => (
                <MenuItem key={parcel?.upin} value={parcel?.upin}>
                  {parcel?.upin}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12}>
        <TextField
          fullWidth={true}
          margin="normal"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item md={12}>
        {
          <IPDCAttachFileWithReset ref={fileInputRef} onChange={files=>setAttachment(files[0])} isMultiple={true} isRequired={true}/>
        }
        {
          //<input type="file" onChange={e => setAttachment(e.target.files[0])} style={{ marginBottom: 16 }} />
        }
      </Grid>
      <Grid item md={12}>
        <Typography color={"red"} align="right">Please note this reservation will expire in 30 days</Typography>
      </Grid>
      {message && (
        <Grid item md={12}>
          {message}
        </Grid>
      )}
    </FormContainer>
  );
}

export default PlaceParcelOnHold;
