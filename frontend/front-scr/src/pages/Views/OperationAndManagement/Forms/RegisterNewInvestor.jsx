import React, { useState } from "react";
import { Grid, TextField, Alert, CircularProgress, FormControlLabel, Typography, InputAdornment } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";
import { ExecutePostWithParams } from "../../../../services/api/ExecuteApiRequests";
import { IPDCAttachFile1 } from "../../../../components/Controls/IPDCAttachFile";
// prettier-ignore
const initialData = {  tin_no: "",company_name: "",contact_person: "",contact_person_position: "",phone_no: "",
                       mobile_no: "",email: "",website: "",nationality_origin: "",capital_in_usd: 0,description: ""};

export default function RegisterNewInvestor() {
  const [formData, setFormData] = useState(initialData);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = async event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleAttachmentsChange = files => {
    setAttachedFiles(files);
  };

  const handleSubmit = async event => {
    console.log("Submit started");
    event.preventDefault();
    setIsLoading(true);
    const formDataWithFiles = new FormData();
    try {
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFiles.append(key, value);
      });

      formDataWithFiles.append("file", selectedFile);

      //      console.log("form data with files: ", formDataWithFiles);
      const responseData = await ExecutePostWithParams("investors", formDataWithFiles, true);
      console.log(responseData);
      if (responseData) {
        setImportSuccess(responseData.message);
        setFormData(initialData);
        setAttachedFiles([]);
        setSelectedFile(null);
      } else {
        setImportError("Failed to save data");
      }
    } catch (error) {
      setImportError("An error occurred during registration. Please try again.");
      console.log("Failed to save data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormContainer title="Register Investor Information" onSubmit={handleSubmit}>
        {(isLoading || importError || importSuccess) && (
          <Grid item xs={12} md={12} alignContent={"center"}>
            {isLoading && <CircularProgress />}
            {importError && <Alert severity="error">{importError}</Alert>}
            {importSuccess && <Alert severity="success">{importSuccess}</Alert>}
          </Grid>
        )}
        {Object.keys(initialData).map(key => (
          <Grid item xs={12} md={key === "description" ? 12 : 6} key={key} sx={{ m: 0, p: 0 }}>
            <TextField
              id={key}
              name={key}
              label={key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
              variant="outlined"
              fullWidth={true}
              required={key !== "phone_no" && key !== "website" && key !== "description" && key !== "mobile_no"}
              multiline={key === "description"}
              rows={key === "description" ? 2 : 1}
              value={formData[key]}
              type={key === "capital_in_usd" ? "number" : "text"}
              onChange={handleChange}
              inputProps={key === "tin_no" ? { minLength: 10, maxLength: 13 } : {}}
              InputProps={
                key === "capital_in_usd" && { endAdornment: <InputAdornment position="start">USD</InputAdornment> }
              }
            />
          </Grid>
        ))}
        <Grid item xs={12} md={12}>
          <IPDCAttachFile1 onChange={handleAttachmentsChange} isMultiple={true} />
        </Grid>
      </FormContainer>
    </>
  );
}
