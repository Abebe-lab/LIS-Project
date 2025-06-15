import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import ImportNewPark from "./ImportNewPark";
import ImportExistingParkData from "./ImportExistingParkData";
//import DefaultMap from "../../../../../MapRelated/DefaultMap";
import { ViewMap } from "../../MapRelated/View";

const ImportSpatialDataDialog = () => {
  const mapRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [importOption, setImportOption] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImportOptionChange = (event) => {
    setImportOption(event.target.value);
  };

  return (
    <div>
      <div className="floating-form shadow-lg d-flex flex-column">
        <Button variant="contained" onClick={handleOpen}>
          Import Spatial Information
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Import Spatial Information</DialogTitle>
          <DialogContent>
            <select value={importOption} onChange={handleImportOptionChange}>
              <option value="">Select Import Option</option>
              <option value="newPark">New Park</option>
              <option value="existingPark">Existing Park</option>
            </select>
            <div className="shadow-lg">
              {importOption === "newPark" && <ImportNewPark />}
              {importOption === "existingPark" && <ImportExistingParkData />}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <ViewMap showLegend={false} />
      </div>
    </div>
  );
};

export default ImportSpatialDataDialog;
