import React, { useEffect, useState, useCallback, forwardRef } from "react";
import { ExecutePostWithParams } from "../../../../../services/api/ExecuteApiRequests";
//prettier-ignore
import { Grid, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Paper } from "@mui/material";
import { IPDCToastMessageResult, IPDCAttachFile1 } from "../../../../../components/Controls";
import { FloatingRightSingleFormDownFromSearchPark } from "../../../../../styles/Form/FormStyles";
import * as MapDataLoader from "../MapRelated/MapData/MapDataLoader";
import * as turf from "@turf/turf";

//prettier-ignore
const MergeForm = forwardRef(({ selectedFeatureOnMap }, ref) => {
  const [upin1, setUpin1] = useState(null);
  const [upin2, setUpin2] = useState(null);
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedFeatureOnMap && selectedFeatureOnMap.length > 0) {
      const [firstUpin, secondUpin] = selectedFeatureOnMap.slice(0, 2).map(feature => feature.get("upin") || "");

      if (selectedFeatureOnMap.length === 1) {
        setUpin1(upin1 || firstUpin);
        if (firstUpin !== upin2) setUpin2(firstUpin);
      } else {
        setUpin1(firstUpin !== upin1 ? firstUpin : upin1);
        setUpin2(secondUpin !== upin2 ? secondUpin : upin2);
      }
    }
  }, [selectedFeatureOnMap, upin1, upin2]);

  const checkFeatureAdjacency = useCallback(async (upin1, upin2) => {
    const existingParcels = await MapDataLoader.loadParcels();
    const [feature1, feature2] = [upin1, upin2].map(upin =>
      existingParcels.features.find(f => f.properties.upin === upin),
    );

    if (!feature1 || !feature2) {
      setResponseMessage("No spatial data found for the given UPINs");
      setAlertSeverity("error");
      return false;
    }

    // Check if features touch or are within a small buffer of each other
    const bufferDistance = 1; // 1 meter buffer
    const bufferedFeatures = [feature1, feature2].map(f => turf.buffer(f, bufferDistance, { units: "meters" }));

    const adjacencyChecks = [
      turf.booleanOverlap(feature1, feature2),
      turf.booleanContains(feature1, feature2),
      turf.booleanContains(feature2, feature1),
      turf.booleanWithin(feature1, feature2),
      turf.booleanWithin(feature2, feature1),
      turf.booleanOverlap(bufferedFeatures[0], feature2),
      turf.booleanOverlap(bufferedFeatures[1], feature1),
    ];

    return adjacencyChecks.some(check => check);
  }, []);
const bothParcelsOccupied=async (upin1, upin2)=> {
  const existingParcels = await MapDataLoader.loadParcels();
  const [feature1, feature2] = [upin1, upin2].map(upin =>
    existingParcels.features.find(f => f.properties.upin === upin),
  );
  if(feature1.properties.occupancy_status==='Occupied' && feature2.properties.occupancy_status==='Occupied'){
    return true;
  }else{
    return false;
  }
}
  const handleSubmit = async e => {
    e.preventDefault();
    if(upin1 === upin2){
      setResponseMessage("The same Parcel Selected, Please enter two parcels")
      setAlertSeverity("warning");
      setConfirmationDialogOpen(true);
      return;
    }
    //it is upto the system
    const areOccupied=await bothParcelsOccupied(upin1, upin2);
    if(areOccupied){
      setResponseMessage("Unable to merge both parcels are occupied, Please verify and try again.");
      setAlertSeverity("error");
      setConfirmationDialogOpen(true);
      return;
    }
    const areAdjacent = await checkFeatureAdjacency(upin1, upin2);

    if (!areAdjacent) {
      setResponseMessage("The parcels are not adjacent, Please select correct features!");
      setAlertSeverity("warning");
      setConfirmationDialogOpen(true);
    } else {
      await submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append("upin1", upin1);
      formData.append("upin2", upin2);
      formData.append("description", description);
      formData.append("file", attachment);
      const responseData = await ExecutePostWithParams("mergeParcel", formData, true);

      if (responseData) {
        setResponseMessage("Consolidation has been successful. Please refresh the map to see changes.");
        setAlertSeverity("success");
        resetForm();
      } else {
        setResponseMessage("Consolidation failed");
        setAlertSeverity("error");
      }
    } catch (err) {
      console.error(err);
      setResponseMessage(`Merge failed: ${err.message}`);
      setAlertSeverity("error");
    }
  };

  const resetForm = () => {
    setUpin1("");
    setUpin2("");
    setDescription("");
    setAttachment(null);
    setResponseMessage("");
    setAlertSeverity("info");
  };

  const handleConfirmation = () => {
    setConfirmationDialogOpen(false);
    setResponseMessage("");
    setAlertSeverity("info");
  };

  return (
    <Paper sx={{ ...FloatingRightSingleFormDownFromSearchPark }} elevation={3}>
      <Typography variant="h5" gutterBottom align="center">
        Consolidate Parcels
      </Typography>
      <form onSubmit={handleSubmit} ref={ref}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/*prettier-ignore */}
            <TextField key="upin1" fullWidth label="UPIN 1" variant="outlined" value={upin1} onChange={e => setUpin1(e.target.value)} 
            required />
          </Grid>
          <Grid item xs={12}>
            {/*prettier-ignore */}
            <TextField key="upin2" fullWidth label="UPIN 2" variant="outlined" value={upin2} onChange={e => setUpin2(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            {/*prettier-ignore */}
            <TextField key="description" fullWidth label="Description" variant="outlined" multiline rows={3} value={description} onChange={e => setDescription(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            {/*prettier-ignore */}
            <IPDCAttachFile1 onChange={e => setAttachment(e[0])} label="Attach Order Dcoument" variant="outlined" multiLine={true} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Consolidate
            </Button>
          </Grid>
        </Grid>
      </form>
      {responseMessage && !confirmationDialogOpen && (
        <IPDCToastMessageResult message={responseMessage} type={alertSeverity} />
      )}
      <Dialog open={confirmationDialogOpen} onClose={handleConfirmation}>
        <DialogTitle>Adjacency Check</DialogTitle>
        <DialogContent>
          <DialogContentText>The parcels are not adjacent. Please select correct features!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
});

export default MergeForm;
