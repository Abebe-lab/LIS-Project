import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import FormContainer from "../../../../../../components/Forms/FormContainer";
import useDecodedUser from "../../../../../../services/hooks/useDecodedUser";
import ParkList from "../../../../Shared/PreRenderedComponents/ParkList";
import { ExecutePostWithParams } from "../../../../../../services/api/ExecuteApiRequests";
import { SPATIAL_FEATURE_OPTIONS, FEATURE_CATEGORIES } from "../../../../../../constants/spatialFeatures";
import shp from "shpjs";
import * as turf from "@turf/turf";
import * as MapDataLoader from "../../MapRelated/MapData/MapDataLoader";

const ImportExistingParkData = () => {
  const decodedUser = useDecodedUser();
  const [formData, setFormData] = useState({ selectedPark: null, category: "", layerName: "", file: null });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });
  const [overlapDetected, setOverlapDetected] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const validateForm = () => {
    const { selectedPark, category, layerName, file } = formData;
    if (!selectedPark) return "Please select a park";
    if (!category) return "Please select a category";
    if (!layerName) return "Please select a feature to import";
    if (!file) return "Please upload a file";
    return null;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus({ ...status, error: validationError });
      return;
    }

    setStatus({ loading: true, error: null, success: null });

    const overlapExists = await isOverlapped();

    if (overlapExists) {
      setStatus({ loading: false, error: null, success: null });
      setConfirmationDialogOpen(true);
    } else {
      await submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const submitData = new FormData();
      submitData.append("imported_by", decodedUser?.id);
      submitData.append("park_id", formData.selectedPark?.id);
      submitData.append("category", formData.category);
      submitData.append("layer_name", formData.layerName);
      submitData.append("file", formData.file);

      const target = "importInfrastructure";
      const response = await ExecutePostWithParams(target, submitData, true);
      if (response?.message) {
        setStatus({ loading: false, error: null, success: response?.message || "Data imported successfully" });
        setOverlapDetected(false);
        window.location.href="/editImportedData";
      }
    } catch (error) {
      setStatus({ loading: false, error: error || "Failed to import data", success: null });
    } finally {
      setStatus({ loading: false, error: null, success: null });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === "category" && { layerName: "" }),
    }));
    setOverlapDetected(false);
  };

  const readZipShapeAndReturnGeojson = async file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async event => {
        try {
          const geojson = await shp(event.target.result);
          resolve(geojson);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const isOverlapped = async () => {
    console.log("is overlapped started");
    console.log("file: ", formData.file && formData.layerName);
    console.log("layer: ", formData.layerName);
    try {
      if (formData.file && formData.layerName === "parcels") {
        const newGeoJSON = await readZipShapeAndReturnGeojson(formData.file);
        console.log("new geojson:", newGeoJSON);
        const existingParcels = await MapDataLoader.loadParcels(); // Assume this returns GeoJSON
        console.log("existing:", existingParcels);
        if (newGeoJSON && newGeoJSON.features && existingParcels.features) {
          for (const newFeature of newGeoJSON.features) {
            for (const existingFeature of existingParcels.features) {
              if (turf.booleanIntersects(newFeature, existingFeature)) {
                setOverlapDetected(true);
                return true;
              }
            }
          }
        }
        setOverlapDetected(false);
        return false;
      }
      return false;
    } catch (error) {
      console.error("Error checking overlap:", error);
      setOverlapDetected(false);
      return false;
    }
  };

  const handleConfirmation = async confirmed => {
    setConfirmationDialogOpen(false);
    if (confirmed) {
      await submitForm();
    } else {
      setStatus({ ...status, error: "Import cancelled due to overlap." });
    }
  };

  return (
    <>
      <Box position={"relative"} justifyContent="center" alignItems="center" width={"100%"}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Button startIcon={<DeleteIcon />} endIcon={<EditIcon />} href="/editImportedData">
              <Typography variant="h6">Show import history</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
      <FormContainer title="Import Data for Existing Park" onSubmit={handleSubmit}>
        {status.error && <Alert severity="error">{status.error}</Alert>}
        {status.success && <Alert severity="success">{status.success}</Alert>}
        {overlapDetected && <Alert severity="warning">Overlap detected with existing parcels!</Alert>}

        <Grid item xs={12}>
          <ParkList
            selectedPark={formData.selectedPark}
            setSelectedPark={park => handleInputChange("selectedPark", park)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Category</InputLabel>
            <Select value={formData.category} onChange={e => handleInputChange("category", e.target.value)} required>
              <MenuItem value="">Select Category</MenuItem>
              {FEATURE_CATEGORIES.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth disabled={!formData.category}>
            <InputLabel>Select Feature to Import</InputLabel>
            <Select value={formData.layerName} onChange={e => handleInputChange("layerName", e.target.value)} required>
              {SPATIAL_FEATURE_OPTIONS[formData.category]?.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="fileUpload">Upload Zipped Shape File (zip):</InputLabel>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept=".zip"
            onChange={e => handleInputChange("file", e.target.files[0])}
            required
          />
        </Grid>
        {status.loading && (
          <Grid item justifyContent="center" style={{ marginTop: 16 }}>
            <CircularProgress />
          </Grid>
        )}
      </FormContainer>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onClose={() => handleConfirmation(false)}>
        <DialogTitle>Overlap Detected</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An overlap has been detected with existing parcels. Do you want to proceed with the import?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmation(true)} color="primary" autoFocus>
            Confirm Import
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImportExistingParkData;
