import React, { useState } from "react";
import { Container, Typography, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import IPDCReportTemplate from "../../../../../components/IPDCReportTemplate"; // Assuming this is your component
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

//import {ExecuteApiRequest} from "../../../../../services/api/ExecuteApiRequests";

const reportOptions = [
  { value: "buildingPermitsRequests", label: "Building Permit Requests" },
  { value: "buildingPermitsIssued", label: "Building Permits Issued" },
  { value: "occupancyPermits", label: "Occupancy Permits" },
  { value: "commentsForCurrentPermitRequests", label: "Comments for Current Permit Requests" },
];

const DesignReportSelector = () => {
  const [selectedReport, setSelectedReport] = useState(reportOptions[0]);
  const [data, setData] = useState(null);
  const [isReportLoaded, setIsReportLoaded] = useState(false);

  const handleReportChange = (event) => {
    const selectedOption = reportOptions.find((option) => option.value === event.target.value);
    setSelectedReport(selectedOption);
  };
  const handleViewReport = async () => {
    try {
      setIsReportLoaded(true);
      const fetchedData = await fetchPermitData(selectedReport.value); // Use the value from the selected object
      console.log(fetchedData);
      setData(fetchedData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPermitData = async (reportType) => {
    switch (reportType) {
      case "buildingPermitsRequests":
        return await GetDataFromApiWithParams("buildingPermits/report");
      case "buildingPermitsIssued":
        return await GetDataFromApiWithParams("buildingPermits/issued");
      case "occupancyPermits":
        return await GetDataFromApiWithParams("occupancyPermits");
      case "commentsForCurrentPermitRequests":
        return await GetDataFromApiWithParams("buildingPermits/comments");
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Design Management Department Reports
        </Typography>
        <FormControl fullWidth={true} variant="outlined" margin="normal">
          <InputLabel>Select Report</InputLabel>
          <Select value={selectedReport.value} onChange={handleReportChange} label="Select Report">
            {reportOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedReport.value}
          onClick={handleViewReport}
          style={{ marginTop: "20px" }}
        >
          View Report
        </Button>
      </Box>

      <Box mt={4}>
        {isReportLoaded ? (
          data || data?.length > 0 ? (
            <IPDCReportTemplate defaultTitle={selectedReport.label} data={data} setData={setData} />
          ) : (
            <Typography variant="h6" color="textSecondary">
              No data available
            </Typography>
          )
        ) : (
          <Typography variant="h6" color="textSecondary">
            Select a report to view the data
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default DesignReportSelector;
