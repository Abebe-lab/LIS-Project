import React, { useState } from "react";
import { Button, IconButton, Box, ListItemText, Grid, FormControl } from "@mui/material";
import { AttachFile as AttachFileIcon, Delete as DeleteIcon } from "@mui/icons-material";

const IPDCAttachmentButton = ({ onAttachmentsChange }) => {
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file) => ({
      name: file.name,
      size: file.size,
      file: file,
    }));
    const updatedAttachments = [...attachments, ...newAttachments];
    setAttachments(updatedAttachments);
    onAttachmentsChange && onAttachmentsChange(updatedAttachments); // Call the callback with updated attachments
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
    onAttachmentsChange && onAttachmentsChange(updatedAttachments); // Update the parent component
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={6}>
        <input id="file-input" type="file" multiple onChange={handleFileChange} style={{ display: "none" }} />
        <label htmlFor="file-input">
          <Button variant="contained" component="span" startIcon={<AttachFileIcon />}>
            Attach Documents
          </Button>
        </label>
      </Grid>
      <Grid item xs={6} md={6}>
        {attachments.length > 0 && (
          <Box>
            {attachments.map((attachment, index) => (
              <Box key={index}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <ListItemText
                      primary={attachment.name}
                      secondary={`Size: ${(attachment.size / 1024).toFixed(2)} KB`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton edge="end" color="error" onClick={() => handleRemoveAttachment(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default IPDCAttachmentButton;
