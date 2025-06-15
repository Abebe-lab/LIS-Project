import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteForever as DeleteIcon } from "@mui/icons-material";

const IPDCConfirmDeletion = ({ onConfirm, onCancel }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <IconButton variant="contained" color="error" onClick={handleOpen}>
        <DeleteIcon color="success" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this record?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IPDCConfirmDeletion;
