import React, { useEffect, useState } from "react";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Paper } from "@mui/material";
import Draggable from "react-draggable";
import ExecuteApiRequest from "../../../../../services/api/ExecuteApiRequest";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
export default function ShowParcelInfoDialog({ upin, setShowWhenReady }) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({ dt: "hello" });
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        setShowWhenReady(true);

        const dt = await ExecuteApiRequest({
          type: "GET",
          targetPoint: "/parcelByOccupancy/" + upin,
          params: { upin: upin },
        });
        if (dt) {
          setData(dt);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromApi();
  }, [upin]);
  console.log(upin);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Parcel Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data && (
              <>
                <div>
                  <div>Block No:{data.upin}</div>
                  <div>UPIN:{data.upin}</div>
                  <div>Occupancy Status: {data.occupancy_status}</div>
                  <div></div>
                </div>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
