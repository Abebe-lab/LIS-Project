import React from "react";
import { Select, Button, FormControl, InputLabel, MenuItem, Paper, Typography, Box, TextField } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Paper size options (Portrait) - Define here or in a common constants file if needed
const paperSizesPortrait = {
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  Letter: { width: 215.9, height: 279.4 },
};

// Common map scales (denominator values)
const mapScales = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

// Paper orientations
const paperOrientations = ["Portrait", "Landscape"];

const PrintSettingsPanel = ({
  paperSize,
  mapScale,
  paperOrientation,
  mapTitle,
  onPaperSizeChange,
  onMapScaleChange,
  onPaperOrientationChange,
  onTitleChange,
  onPrintPreview,
  onPrint,
}) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Print Settings
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          key="title"
          type="text"
          fullWidth
          label="Map Title"
          id="map-title-input"
          value={mapTitle}
          onChange={onTitleChange}
          variant="outlined"
          size="small"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="paper-size-label">Paper Size</InputLabel>
        <Select
          labelId="paper-size-label"
          id="paper-size-select"
          value={paperSize}
          label="Paper Size"
          onChange={onPaperSizeChange}
          size="small"
        >
          {Object.keys(paperSizesPortrait).map(size => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="paper-orientation-label">Orientation</InputLabel>
        <Select
          labelId="paper-orientation-label"
          id="paper-orientation-select"
          value={paperOrientation}
          label="Orientation"
          onChange={onPaperOrientationChange}
          size="small"
        >
          {paperOrientations.map(orientation => (
            <MenuItem key={orientation} value={orientation}>
              {orientation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="map-scale-label">Map Scale</InputLabel>
        <Select
          labelId="map-scale-label"
          id="map-scale-select"
          value={mapScale}
          label="Map Scale"
          onChange={onMapScaleChange}
          size="small"
        >
          {mapScales.map(scale => (
            <MenuItem key={scale} value={scale}>{`1:${scale}`}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Button variant="contained" startIcon={<VisibilityIcon />} onClick={onPrintPreview} sx={{ mr: 1 }} size="small">
          Print Preview
        </Button>
        <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={onPrint} size="small">
          Print
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default PrintSettingsPanel;
