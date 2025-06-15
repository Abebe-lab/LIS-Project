import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function IPDCInputFileUpload({ selectedFiles, handleFileChange, title = "Upload files", props }) {
  const displayAttachedFiles = () => {
    if (selectedFiles.length === 0) {
      return "No files attached";
    }

    const fileNames = Array.from(selectedFiles).map((file) => file.name); // Extract file names
    return `Attached files: ${fileNames.join(", ")}`; // Join file names with comma and space
  };
  return (
    <>
      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
        {title}
        {props}
        <VisuallyHiddenInput type="file" value={selectedFiles} onChange={handleFileChange} multiple />
      </Button>
      <p>{displayAttachedFiles()}</p>
    </>
  );
}
