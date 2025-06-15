import { useState } from "react";
import { Button, Typography, Box, Snackbar, Grid } from "@mui/material";
import { UpdateAndGetResponse } from "../../../../../services/api/ExecuteApiRequests";
import IPDCStylizedTextField from "../../../../../components/Controls/IPDCStylizedTextField";

export default function ApprovePlanPage() {
  const [formData, setFormData] = useState({
    approved_on: "",
    approved_by: "",
    approval_comment: "",
    attachment_for_approval: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("update approve plan saving started...");
    try {
      const response = await UpdateAndGetResponse(`saveApproval`, formData);
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
  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}
