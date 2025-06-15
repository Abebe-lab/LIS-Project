import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import FormContainer from "../../../../../../components/Forms/FormContainer";
import useDecodedUser from "../../../../../../services/hooks/useDecodedUser";
import { ExecutePostWithParams, GetDataFromApiWithParams } from "../../../../../../services/api/ExecuteApiRequests";

export default function RegisterOPRequest() {
  const decodedUser = useDecodedUser();
  const [requestNumbers, setRequestNumbers] = useState([]);
  const [buildingPermitNo, setBuildingPermitNo] = useState("");
  const [requestDate, setRequestDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [requestFormAttachedPath, setRequestFormAttachedPath] = useState(null);
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchBuildigPermit = async () => {
      try {
        const resultData = await GetDataFromApiWithParams("buildingPermits");
        setRequestNumbers(resultData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBuildigPermit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
    console.log("Permit no:", buildingPermitNo);
    const formData = new FormData();
    formData.append("requested_on", requestDate);
    formData.append("building_permit_id", buildingPermitNo);
    formData.append("description", description);
    formData.append("request_registered_by", decodedUser.id);
    formData.append("file", requestFormAttachedPath);
      const responseData= await ExecutePostWithParams("occupancyPermits", formData, true);
      if(responseData){
        console.log(responseData);
        //reset page
        setRequestDate(new Date().toISOString().slice(0, 10));
        setBuildingPermitNo("");
        setRequestFormAttachedPath(null);
        setDescription("");
        setResponseMessage("Occupancy Permit Registration successful!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FormContainer
        title={"Occupancy Permit Registration"}
        onSubmit={handleSubmit}
      >
        <Grid item xs={12} md={12}>
          <TextField
            label="Request Date"
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <InputLabel>Building Permit Number</InputLabel>
            <Select
              value={buildingPermitNo}
              onChange={(e) => setBuildingPermitNo(e.target.value)}
            >
              {(requestNumbers && requestNumbers.length > 0) && requestNumbers?.map((num) => (
                <MenuItem key={num?.id} value={num?.id}>
                  {num?.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth={true}>
            <Button
              variant="contained"
              component="label"
              startIcon={<AttachFile />}
            >
              Attach Requets Form
              <input
                type="file"
                accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
                onChange={(e) => setRequestFormAttachedPath(e.target.files[0])}
                style={{ display: "none" }}
              />
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          {responseMessage && <p>{responseMessage}</p>}
        </Grid>
      </FormContainer>
    </>
  );
}
