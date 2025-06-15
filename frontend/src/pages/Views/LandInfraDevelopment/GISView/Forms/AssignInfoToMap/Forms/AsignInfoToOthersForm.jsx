import React, { useState } from "react";
import IPDCStylizedTextField from "../../../../../../../components/Controls/IPDCStylizedTextField";
import { Button, Typography, Box, Snackbar, Grid } from "@mui/material";

import { UpdateAndGetResponse } from "../../../../../../../services/api/ExecuteApiRequests";

const AsignInfoToOthersForm = ({ featureInfo }) => {
  const [formData, setFormData] = useState({
    feature: featureInfo?.feature,
    type: featureInfo?.feature || "",
    id: featureInfo?.id || "",
    name: featureInfo?.name || "",
    shape_type: featureInfo?.type || "multi",
    capacity: featureInfo?.capacity || 0,
    unit_of_measure: featureInfo?.unit_of_measure || "",
    description: featureInfo?.description || "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  //const [responseMessage, setResponseMessage] = useState("");

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Info saving started...");
    try {
      const response = await UpdateAndGetResponse(`others/${formData.type}/id/${formData.id}`, formData);
      if (response.status === 201) {
        setSnackbar({ open: true, message: "Registration successful!" });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Registration failed: ${error.message}`,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Feature Info
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
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="shape_type"
            label="Shape"
            value={formData.shape_type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="capacity"
            label="Capacity/Length/Area"
            value={formData.capacity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField
            fullWidth={true}
            id="unit_of_measure"
            label="Unit of measure"
            value={formData.unit_of_measure}
            onChange={handleChange}
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
          <Button type="submit" variant="contained" color="primary" fullWidth={true}>
            Assign Info
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default AsignInfoToOthersForm;
