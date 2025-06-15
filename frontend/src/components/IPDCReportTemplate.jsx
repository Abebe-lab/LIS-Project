import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  Avatar,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Grid,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import ReactToPrint from "react-to-print";

import { IPDCFinalTable } from "./";
import IPDCPrintButtom from "./IPDCPrintButtom";
import "./print-buttom.css";
const IPDCReportTemplate = ({
  defaultTitle,
  data,
  setData,
  isPrintable = true,
  isEditable = false,
  isDeletable = false,
  showWhatToDisplay = true,
  showHeader = true,
}) => {
  const componentRef = useRef();

  const [title, setTitle] = useState(defaultTitle);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    const fetchColumnsToShow = async () => {
      if (data) {
        const cols = data.length ? Object.keys(data[0]) : [];
        setColumns(cols);
        setSelectedColumns(cols);
      }
    };
    fetchColumnsToShow();
  }, [data]);

  const handleColumnChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedColumns(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Container>
      <CssBaseline />
      {isPrintable && (
        <Box component="form" noValidate autoComplete="off" className="no-print">
          <Grid container gap={1}>
            <Grid item md={4} xs={12}>
              <TextField
                label="Report Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="column-select-label">
                  Select Columns to Display
                </InputLabel>
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
            <Grid item md={3} xs={12}>
              <Box
                sx={{ alignItems: "end", justifyContent: "end", mt: 2 }}
              >
                <ReactToPrint
                  trigger={() => (
                    <Button color="primary">
                      <Avatar>
                        <Print />
                      </Avatar>
                      <Box px={2} color="primary">
                        {"Print"}
                      </Box>
                    </Button>
                  )}
                  content={() => componentRef.current}
                  pageStyle="@page { size: A4 landscape; margin: 1cm; } body { font-size: 12pt; word-wrap: break-word; }"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {data ? (
        <Box ref={componentRef}>
          <IPDCFinalTable
            data={data}
            setData={setData}
            title={title}
            selectedColumns={selectedColumns}
            isEditable={isEditable}
            isDeletable={isDeletable}
            showHeader={showHeader}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              bgcolor: "background.paper",
              textAlign: "center",
              display: "none", // Hide on screen
            }}
            className="print-only"
          >
            <IPDCPrintButtom />
          </Box>
        </Box>
      ) : (
        "No Data Found!"
      )}
    </Container>
  );
};

export default IPDCReportTemplate;
