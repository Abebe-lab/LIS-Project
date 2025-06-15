import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import IPDCStylizedTextField from "../../../../../../../components/Controls/IPDCStylizedTextField";
import { UpdateAndGetResponse } from "../../../../../../../services/api/ExecuteApiRequests";
import IPDCToastMessageResult from "../../../../../../../components/Controls/IPDCToastMessageResult";
//prettier-ignore
const initialData = {
  feature: "", type: "", id: "", block_no: "", name: "", planned_parcels: "", existing_parcels: "", description: "", status: "",
};
const AsignBlockForm = ({ featureInfo }) => {
  const [formData, setFormData] = useState(initialData);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "info" });

  useEffect(() => {
    if (featureInfo) {
      const newFormData = {
        feature: featureInfo?.feature,
        type: featureInfo?.feature || "",
        id: featureInfo?.id || "",
        block_no: featureInfo?.block_no || "",
        name: featureInfo?.name || "",
        planned_parcels: featureInfo?.planned_parcels || 0,
        existing_parcels: featureInfo?.existing_parcels || 0,
        description: featureInfo?.description || "",
        status: featureInfo?.status || "Active",
      };
      setFormData(newFormData);
    }
  }, [featureInfo]);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Info saving started...");
    try {
      const response = await UpdateAndGetResponse(`blocks/${formData.id}`, formData);
      if (response) {
        setSnackbar({ open: true, message: `Updating of block no: ${formData.block_no} successful!`, type: "success" });
        setFormData(initialData);
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Updating of block info failed`, type: "error" });
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Block Info
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="id"
            label="ID"
            value={formData.id}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="type"
            label="type"
            value={formData.type}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="block_no"
            label="Block No"
            value={formData.block_no}
            onChange={handleChange}
            //type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="planned_parcels"
            label="Planned Parcels"
            value={formData.planned_parcels}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="existing_parcels"
            label="Existing Parcels"
            value={formData.existing_parcels}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth={true}>
            Assign Info
          </Button>
        </Grid>
      </Grid>
      {snackbar.message && <IPDCToastMessageResult message={snackbar.message} type={snackbar.type} />}
    </Box>
  );
};

export default AsignBlockForm;
