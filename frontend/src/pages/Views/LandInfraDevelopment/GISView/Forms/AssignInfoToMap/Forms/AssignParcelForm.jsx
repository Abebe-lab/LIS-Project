import React, { useEffect, useState } from "react";
import IPDCStylizedTextField from "../../../../../../../components/Controls/IPDCStylizedTextField";
import { TextField, Button, Typography, Box, Snackbar, Grid, Select, MenuItem } from "@mui/material";
import IPDCToastMessageResult from "../../../../../../../components/Controls/IPDCToastMessageResult";

import { UpdateAndGetResponse } from "../../../../../../../services/api/ExecuteApiRequests";
const types = [
  { key: "SHED", label: "SHED" },
  { key: "PARCEL", label: "Developed Land" },
];
//prettier-ignore
const initialData = { localId: "", blockNo: "", upin: "", name: "", plannedFunction: "", currentFunction: "", 
  description: "", type: "", noOfBuildings: "", noOfPlannedBuildings: ""};
const AssignParcelForm = ({ featureInfo }) => {
  const [formData, setFormData] = useState(initialData);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "info" });

  useEffect(() => {
    console.log(featureInfo);
    if (featureInfo) {
      const newFormData = {
        localId: featureInfo?.local_shed_parcel_no || "",
        blockNo: featureInfo?.block_no || "",
        upin: featureInfo?.upin || "",
        name: featureInfo?.name || "",
        currentFunction: featureInfo?.current_function || "",
        plannedFunction: featureInfo?.planned_for || "",
        noOfBuildings: featureInfo?.no_of_buildings || 0,
        noOfPlannedBuildings: featureInfo?.no_of_planned_buildings || 0,
        description: featureInfo?.description || "",
        type: featureInfo?.type || "",
      };
      //console.log("Updating formData to:", newFormData);
      setFormData(newFormData);
    }
  }, [featureInfo]);
  const handleChange = e => {
    const { id, name, value } = e.target;
    //alert(value?.toString());
    setFormData(prev => ({ ...prev, [id || name]: value }));
    /*if(value==="SHED" && (formData.noOfBuildings==="" || formData.noOfPlannedBuildings===0)){
      setFormData((prev) => ({ ...prev, noOfBuildings:1, noOfPlannedBuildings:1 }));
    }else if((formData.noOfBuildings==="" || formData.noOfPlannedBuildings===0)){
      setFormData((prev) => ({ ...prev, noOfBuildings: 0, noOfPlannedBuildings: 0 }));
    }*/
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await UpdateAndGetResponse(`parcels/${formData.upin}`, {
        upin: formData.upin,
        name: formData.name,
        planned_for: formData.plannedFunction,
        current_function: formData.currentFunction,
        type: formData.type,
        no_of_planned_buildings: formData.noOfPlannedBuildings,
        no_of_buildings: formData.noOfBuildings,
        local_shed_parcel_no: formData.localId,
        block_no: formData.blockNo,
        description: formData.description,
      });
      if (response) {
        setSnackbar({ open: true, message: `Updating of parcel upin: ${formData?.upin} successful!`, type: "success" });
        setFormData(initialData);
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Updating of parcel upin: ${formData?.upin} info failed`, type: "error" });
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Parcel Info
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField id="upin" label="UPIN" value={formData.upin} onChange={handleChange} disabled />
        </Grid>
        <Grid item xs={6}>
          <IPDCStylizedTextField id="localId" label="Local shed/parcel no" value={formData.localId} onChange={handleChange} disabled />
        </Grid>
        <Grid item xs={6}>
          <IPDCStylizedTextField
            id="blockNo"
            label="Block No"
            value={formData.blockNo}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField id="name" label="Name" value={formData.name} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <IPDCStylizedTextField
            id="plannedFunction"
            label="Planned Use"
            value={formData.plannedFunction}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <IPDCStylizedTextField
            id="currentFunction"
            label="Current Use"
            value={formData.currentFunction}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            name="type" // Use `name` to ensure it works with the `handleChange`
            value={formData.type}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Parcel Type
            </MenuItem>
            {types?.map(type => (
              <MenuItem key={type.key} value={type.key}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            type="number"
            id="noOfBuildings"
            label="No of buildings"
            value={formData.noOfBuildings}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            type="number"
            id="noOfPlannedBuildings"
            label="No of Planned buildings"
            value={formData.noOfPlannedBuildings}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth={true}>
            Assign Parcel Info
          </Button>
        </Grid>
      </Grid>
      {snackbar.message && <IPDCToastMessageResult message={snackbar.message} type={snackbar.type} />}
    </Box>
  );
};

export default AssignParcelForm;
