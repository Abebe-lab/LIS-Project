import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  CircularProgress,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Grid,
} from "@mui/material";
import ReactToPrint from "react-to-print";

import { IPDCFinalTable } from "../../../../components/index";
import { GetUsers } from "../CommonData/CommonData";

export default function SampleReport() {
  const componentRef = useRef();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("User Report");
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await GetUsers();
      if (data) {
        const cols = data.length ? Object.keys(data[0]) : [];
        setColumns(cols);
        setSelectedColumns(cols);
        setData(data);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleColumnChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedColumns(typeof value === "string" ? value.split(",") : value);
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <CssBaseline />
      <Box component="form" noValidate autoComplete="off" mb={3}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              label="Report Title"
              variant="outlined"
              fullWidth={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true} margin="normal">
              <InputLabel id="column-select-label">Select Columns to Display</InputLabel>
              <Select
                labelId="column-select-label"
                multiple
                value={selectedColumns}
                onChange={handleColumnChange}
                input={<OutlinedInput label="Select Columns" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {columns.map((column) => (
                  <MenuItem key={column} value={column}>
                    <Checkbox checked={selectedColumns.indexOf(column) > -1} />
                    <ListItemText primary={column} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <ReactToPrint
        trigger={() => (
          <Button variant="contained" color="primary">
            Print this out!
          </Button>
        )}
        content={() => componentRef.current}
      />
      {loading ? (
        <CircularProgress />
      ) : data ? (
        <IPDCFinalTable
          ref={componentRef}
          data={data}
          setData={setData}
          title={title}
          selectedColumns={selectedColumns}
          isEditable={true}
        />
      ) : (
        "No Data Found!"
      )}
    </Container>
  );
}
/*<TextField
			label="API Endpoint"
			variant="outlined"
			fullWidth={true}
			value={apiEndpoint}
			onChange={(e) => setApiEndpoint(e.target.value)}
			margin="normal"
		  />*/
/*<ReportTemplate ref={componentRef} apiEndpoint={apiEndpoint} title={title} selectedColumns={selectedColumns} />
			 <EditableReport ref={componentRef} apiEndpoint={apiEndpoint} title={title} selectedColumns={selectedColumns} />
			{<EditableSearchableAndPrintableTable
				ref={componentRef}
				apiEndpoint={apiEndpoint}
				title={title}
				selectedColumns={selectedColumns}
			/>*/
//import ReportTemplate from "./ReportTemplate";
//import EditableReport from "./EditableReport";
//import EditableSearchableAndPrintableTable from "./EditableSearchableAndPrintableTable";
