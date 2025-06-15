import React, { useState, useEffect } from "react";
import { CircularProgress, Container, Grid, ListItemText, Select, MenuItem, Button } from "@mui/material";
import DisplayAppropriateReport from "./DisplayAppropriateReport";


export default function FormattedReport({reports,department}) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportToshow, setReportToshow] = useState(null);
  const [hasReportChanged, setHasReportChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const changeReport = async () => {
      if (selectedReport) {
        // Check if selectedReport has changed
        setLoading(true);
        setReportToshow(
          <DisplayAppropriateReport
            reportType={selectedReport}
            department={department}
            title={reports.find(report => report.access === selectedReport).title}
          />,
        );
        setHasReportChanged(false); // Update hasReportChanged after report update
        setLoading(false);
      }
    };
    changeReport(); // Call changeReport on every render
  }, [selectedReport]);
  const handleSelectReport = async (e) => setHasReportChanged(true);
  const handleReportChange = (e) => setSelectedReport(e.target.value);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Grid
        container
        mb={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item px={2} md={6}>
          <Select
            value={selectedReport}
            onChange={handleReportChange}
            sx={{
              height: "40px", // Adjust the height to match the button's height
              "& .MuiInputBase-input": {
                padding: "8px 14px", // Adjust padding for the input area
              },
            }}
            fullWidth={true}
          >
            {reports.map((report, index) => (
              <MenuItem key={index} value={report.access}>
                <ListItemText primary={report.title} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={6}>
          <Button variant="outlined" onClick={handleSelectReport} sx={{ height: "40px" }}>
            Select Report
          </Button>
        </Grid>
      </Grid>
      {reportToshow && hasReportChanged && reportToshow}
    </Container>
  );
}
