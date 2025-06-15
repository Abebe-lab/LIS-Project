import React from "react";
import { Grid, FormControlLabel, Checkbox, Box } from "@mui/material";
import LAYER_COLORS from "../Util/LAYER_COLORS";

const LayerVisibilityControl = ({ layers, visibility, onChange }) => {
  return (
    <Grid container>
      {layers.map(layer => (
        <Grid item xs={12} key={layer}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {
            //prettier-ignore 
            }
            <Box sx={{ width: 16, height: 16, backgroundColor: getLayerColor(layer), marginRight: 1, border: "1px solid #ccc", }} />
            <FormControlLabel
              control={<Checkbox checked={visibility[layer]} onChange={onChange(layer)} name={layer} />}
              label={layer.charAt(0).toUpperCase() + layer.slice(1)}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

// Helper function to assign colors to layers
const getLayerColor = layer => {
  const colors = {
    park: LAYER_COLORS.PARK.color,
    blocks: LAYER_COLORS.BLOCK.color,
    parcels: LAYER_COLORS.PARCEL.VACANT.color,
    sheds: LAYER_COLORS.SHED.color,
    buildings: LAYER_COLORS.BUILDING.color, //"#E91E63",
    roads: LAYER_COLORS.ROAD.color, //"#795548",
    greenAreas: LAYER_COLORS.GREEN_AREA.color, //"#8BC34A",
    otherInfras: "#607D8B",
    importeds: "#FF5722",
    gcps: "#00BCD4",
    wasteDisposals: "#9E9E9E",
    waters: LAYER_COLORS.WATER.color, // "#03A9F4",
    powers: LAYER_COLORS.WATER.color, //"#F44336",
    communications: LAYER_COLORS.COMMUNICATION.color, //"#3F51B5",
    storages: LAYER_COLORS.STORAGE.color, //"#FF9800",
    surveyDatas: "#009688",
    plans: LAYER_COLORS.PLAN.color, //"#673AB7",
    unapprovedImports: "#FF5252",
  };
  return colors[layer] || "#000000";
};

export default LayerVisibilityControl;
