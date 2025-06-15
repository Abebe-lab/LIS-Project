import React, { useEffect, useState, useCallback } from "react";
import {
  AssignParkForm,
  AssignBlockForm,
  AssignParcelForm,
  AssignInfrastructureForm,
  AssignGreenAreaForm,
  AssignShedForm,
  AsignInfoToOthersForm,
} from "./Forms";
import ViewMap from "../../MapRelated/Views/ViewMap";

import { Box, Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { FloatingRightSingleFormNearTop } from "../../../../../../styles/Form/FormStyles";
import { feature } from "@turf/turf";

// Constants for feature types
const FEATURE_TYPES = [
  { key: "PARK", label: "Park" },
  { key: "BLOCK", label: "Block" },
  { key: "PARCEL", label: "Parcel" },
  { key: "GREEN", label: "Green Area" },
  { key: "GREEN AREA", label: "Green Area" },
  { key: "SHED", label: "Shed" },
  { key: "ROAD", label: "Road" },
  { key: "GPX", label: "GPS exchange format" },
  { key: "GCP", label: "Ground Control Point" },
  { key: "Power", label: "Power" },
  { key: "Communication", label: "Communication" },
  { key: "Water", label: "Water" },
  { key: "INFRA", label: "Other Infrastructure" },
  { key: "waste", label: "Waste Disposal" },
  { key: "OTHERS", label: "Other" },
];

// Helper function to map feature type to form component
const formMap = {
  PARK: AssignParkForm,
  BLOCK: AssignBlockForm,
  PARCEL: AssignParcelForm,
  INFRA: AssignInfrastructureForm,
  ROAD: AssignInfrastructureForm,
  GREEN: AssignGreenAreaForm,
  SHED: AssignShedForm,
  OTHERS: AsignInfoToOthersForm,
  'GREEN AREA': AssignGreenAreaForm,
};

export default function AssignInfoToMap() {
  const [selectedFeatureOnMap, setSelectedFeatureOnMap] = useState(null);
  const [selectedFeatureAttributeInfo, setSelectedFeatureAttributeInfo] = useState(null);
  const [selectedFeatureType, setSelectedFeatureType] = useState(FEATURE_TYPES[0].key);
  const [formToDisplay, setFormToDisplay] = useState(null);

  const updateFeatureInfo = useCallback(
    feature => {
      if (!feature) return;
      const { geometry, ...attributes } = feature[0]?.getProperties() || {};
      setSelectedFeatureType(attributes?.feature);
      setSelectedFeatureAttributeInfo(attributes);
    },
    [feature],
  );

  useEffect(() => {
    updateFeatureInfo(selectedFeatureOnMap);
  }, [selectedFeatureOnMap, updateFeatureInfo]);

  const changeFormsBasedOnChoice = useCallback(() => {
    const FormComponent = formMap[selectedFeatureType] || AsignInfoToOthersForm;
    setFormToDisplay(<FormComponent featureInfo={selectedFeatureAttributeInfo} />);
  }, [selectedFeatureType, selectedFeatureAttributeInfo]);

  useEffect(() => {
    changeFormsBasedOnChoice();
  }, [changeFormsBasedOnChoice]);

  return (
    <>
      <Paper
        sx={{ ...FloatingRightSingleFormNearTop, maxHeight: "84vh", pl: 2, pt: 1, pb: 0 }}
        elevation={3}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold" align="center">
              Assign Info To Feature
            </Typography>
            <Typography align="center" variant="subtitle1" color="red">
              (Please refresh map to see changes)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="feature-type-label">Feature Type</InputLabel>
              <Select
                labelId="feature-type-label"
                id="featureType"
                value={selectedFeatureType}
                onChange={event => setSelectedFeatureType(event.target.value)}
                label="Feature Type"
                sx={{ height: "32px" }}
              >
                {FEATURE_TYPES.map(({ key, label }) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                mb: 2,
              }}
            >
              {formToDisplay && <Box sx={{ p: 2, overflowY: "auto" }}>{formToDisplay}</Box>}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ position: "relative", height: "90vh", overflow: "visible" }}>
        <ViewMap showPopup={false} setSelectedFeatureOnMap={setSelectedFeatureOnMap} showLegend={true} />
      </Box>
    </>
  );
}
