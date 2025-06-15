import { useState, forwardRef,useImperativeHandle  } from "react";
import { Box, Button, Typography, IconButton, Grid, Paper } from "@mui/material";
import { AttachFile, Delete } from "@mui/icons-material";

const IPDCAttachFile1 = ({ onChange, accept = "image/*,application/pdf", isMultiple = false, isRequired = false, label="Attach File", variant="outlined", multiLine=false }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = event => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles); // Update state with selected files
    onChange(selectedFiles); // Trigger parent onChange handler
  };

  const handleRemoveFile = index => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles); // Update state after file removal
    onChange(updatedFiles); // Update parent on file removal
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={multiLine ? 12 : 6}>
        <input
          type="file"
          accept={accept}
          style={{ display: "none" }}
          id="file-upload"
          multiple={isMultiple}
          onChange={handleFileChange}
          required={isRequired}
        />
        <label htmlFor="file-upload">
          <Button 
            variant={variant} 
            color="primary" 
            startIcon={<AttachFile />} 
            component="span"
          >
            {label}
          </Button>
        </label>
      </Grid>
      <Grid item xs={multiLine ? 12 : 6}>
        {files.length > 0 && (
          <Grid container spacing={2}>
            {files.map((file, index) => (
              <Grid item key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
                  <IconButton size="small" onClick={() => handleRemoveFile(index)}>
                    <Delete fontSize="small" sx={{ fill: "red" }} />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const IPDCAttachFileWithReset = forwardRef(({ onChange, accept = "image/*,application/pdf", isMultiple = false, isRequired = false }, ref) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles); // Update state with selected files
    onChange(selectedFiles); // Trigger parent onChange handler
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles); // Update state after file removal
    onChange(updatedFiles); // Update parent on file removal
  };

  // Expose the reset function to the parent via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFiles([]); // Clear files
      onChange([]); // Notify parent of reset
      document.getElementById("file-upload").value = ""; // Reset file input
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2, // Spacing between file cards
      }}
    >
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        id="file-upload"
        multiple={isMultiple}
        onChange={handleFileChange}
        required={isRequired}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" startIcon={<AttachFile sx={{ fill: "white" }} />} component="span">
          Attach Files
        </Button>
      </label>

      {files.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {files.map((file, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                padding: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "auto",
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Typography variant="body2" noWrap>
                {file.name}
              </Typography>
              <IconButton size="small" onClick={() => handleRemoveFile(index)}>
                <Delete fontSize="small" sx={{ fill: "red" }} />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
});


export { IPDCAttachFile1,IPDCAttachFileWithReset };
/*const FileAttachment = ({ onFileSubmit }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = event => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(prevFiles => [...prevFiles, ...fileArray]);
    }
  };

  const handleRemoveFile = index => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onFileSubmit(files);
    } else {
      alert("No files selected!");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Attach Files</Typography>

      <input accept="*" style={{ display: "none" }} id="file-input" type="file" multiple onChange={handleFileChange} />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" startIcon={<AttachFile sx={{fill: "white"}} />} component="span">
          Select Files
        </Button>
      </label>

      {files.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1">Attached Files:</Typography>
          <List>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={files.length === 0}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
*/