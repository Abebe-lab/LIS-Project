import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import * as XLSX from "xlsx";
import FormContainer from "../../../../components/Forms/FormContainer";

import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import { ExecuteApiToPost } from "../../../../services/api/ExecuteApiRequests";

//import { ExecuteApiRequest } from "../../../../services/api/ExecuteApiRequests";
//todo: if file selction is used
const ImportExistingTenant = () => {
  const decodedUser = useDecodedUser();
  //const [selectedPark, setSelectedPark] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileToBeImported, setFileToBeImported] = useState(null);
  //const [fileData, setFileData] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);

  const handleFileChange = (e) => {
    setIsLoading(true);
    try {
      if (!fileToBeImported) {
        setImportError("Please select file to import.");
        return;
      }
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        console.log(reader);
        // if (reader.result) {

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[fileToBeImported];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setPreviewData(jsonData);
          setSelectedFile(file);
          //console.log(previewData);
          //setFileData(jsonData);
        };
        reader.readAsArrayBuffer(file);
        //} else {
        //setImportError("File uploading has a problem, please make sure it is not accessed by other applications.");
        // }
      }
    } catch (err) {
      console.log(err);
      setImportError(err);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setImportError("Please select an Excel file to import.");
      return;
    } else if (!fileToBeImported) {
      setImportError("Please select park first.");
      return;
    }

    setIsLoading(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      const formData = new FormData();
      formData.append("importType", fileToBeImported);
      formData.append("user_id", decodedUser.id);
      formData.append("file", selectedFile);
      const result = await ExecuteApiToPost("investors/importTenants", formData);
      if (result) setImportSuccess(result); // Assuming success message from backend
      setFileToBeImported("");
      setPreviewData([]);
    } catch (error) {
      console.error("Error importing tenants:", error);
      setImportError("An error occurred during import. Please try again.");
    } finally {
      setSelectedFile(null);
      //setSelectedPark(null);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer title="Import Existing Tenants" onSubmit={handleSubmit}>
        {/*<Grid item md={12} xs={12}>
          <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
        </Grid>*/}
        <Grid item md={12} xs={12}>
          <FormControl fullWidth={true}>
            <InputLabel id="file-to-import">File to import</InputLabel>
            <Select
              fullWidth={true}
              label="Files to Import"
              id="importType"
              name="importType"
              value={fileToBeImported}
              onChange={(event) => setFileToBeImported(event.target.value)}
              required
            >
              <MenuItem value="companies">Companies</MenuItem>
              <MenuItem value="agreements">Agreements</MenuItem>
              <MenuItem value="collection">Finance Collection</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Button
              variant="contained"
              component="label"
              startIcon={<AttachFile />}
              disabled={isLoading ? true : false}
            >
              Attach the excel file
              <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} style={{ display: "none" }} />
            </Button>
          </FormControl>
        </Grid>
        {previewData.length > 0 && (
          /*<IPDCFinalTable data={previewData.slice(1)} setData={setPreviewData} title="Preview"	/>*/
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {previewData[0].map((col, index) => (
                    <TableCell key={index}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </FormContainer>
      {isLoading && <CircularProgress />}
      {importError && <Alert severity="error">{importError}</Alert>}
      {importSuccess && <Alert severity="success">{importSuccess}</Alert>}
    </Container>
  );
};

export default ImportExistingTenant;
