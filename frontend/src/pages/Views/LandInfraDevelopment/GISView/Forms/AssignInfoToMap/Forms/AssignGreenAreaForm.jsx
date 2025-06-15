import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import IPDCStylizedTextField from "../../../../../../../components/Controls/IPDCStylizedTextField";
import { UpdateAndGetResponse } from "../../../../../../../services/api/ExecuteApiRequests";
import IPDCToastMessageResult from "../../../../../../../components/Controls/IPDCToastMessageResult";

const initialData = { id: "", name: "", type: "", description: "" };

const AssignGreenAreaForm = ({ featureInfo }) => {
  const [formData, setFormData] = useState(initialData);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "info" });

  useEffect(() => {
    if (featureInfo) {
      const newFormData = {
        id: featureInfo?.id || "",
        name: featureInfo?.name || "",
        type: featureInfo?.type || "",
        description: featureInfo?.description || "",
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
    try {
      const response = await UpdateAndGetResponse(`greenarea/${formData.id}`, formData);
      console.log(response);
      if (response) {
        setSnackbar({ open: true, message: `Updating Green info of ${formData.name} successful!`, type: "success" });
        setFormData(initialData);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Updating Green info failed: ${error.message}`,
        type: "error",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Green Area Info
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField id="id" label="ID" value={formData.id} onChange={handleChange} disabled />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField id="name" label="Name" value={formData.name} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <IPDCStylizedTextField id="type" label="Type" value={formData.type} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Assign Info
          </Button>
        </Grid>
      </Grid>
      {snackbar.message && <IPDCToastMessageResult message={snackbar.message} type={snackbar.type} />}
    </Box>
  );
};

export default AssignGreenAreaForm;
