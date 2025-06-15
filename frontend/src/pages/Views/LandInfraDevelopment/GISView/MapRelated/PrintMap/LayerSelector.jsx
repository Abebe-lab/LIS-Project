import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const LayerSelector = ({ layers, selectedLayers, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Select Layers</InputLabel>
      <Select
        multiple
        value={selectedLayers}
        onChange={onChange}
        renderValue={(selected) => selected.join(", ")}
      >
        {layers.map((layer) => (
          <MenuItem key={layer} value={layer}>
            {layer.charAt(0).toUpperCase() + layer.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LayerSelector;