import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { ExecuteApiToPost, GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

const DetailPlanView = ({ permitRequestNumber }) => {
  const [permitDetails, setPermitDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch permit details from the API using the permitRequestNumber
    const fetchPermitDetails = async () => {
      try {
        const data = await GetDataFromApiWithParams(`buildingPermit/${permitRequestNumber}`); // ExecuteApiRequest({type: "GET", targetPoint: });
        setPermitDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching permit details:", error);
        setLoading(false);
      }
    };

    fetchPermitDetails();
  }, [permitRequestNumber]);

  const handleSubmit = async () => {
    try {
      const responseData = await ExecuteApiToPost(`buildingPermits/${permitRequestNumber}/comment`, {
        comment,
      });
      console.log(responseData);
      alert("Comment submitted successfully!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={3}>
      {permitDetails ? (
        <>
          <Typography variant="h5" gutterBottom>
            Building Permit Request: {permitRequestNumber}
          </Typography>
          {/* Display other details */}
          <Typography variant="body1" gutterBottom>
            {/* Example Detail: */}
            Project Name: {permitDetails.projectName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {/* Additional Details Here */}
          </Typography>

          {/* AutoCAD Viewer Component */}
          <Box my={3}>
            {/* Replace with your actual AutoCAD viewer component */}
            <div id="autocad-viewer">AutoCAD Drawing Viewer Placeholder</div>
          </Box>

          {/* Comment Input */}
          <TextField
            label="Add your comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth={true}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Comment
          </Button>
        </>
      ) : (
        <Typography variant="h6" color="error">
          No details found for permit request number {permitRequestNumber}.
        </Typography>
      )}
    </Box>
  );
};

export default DetailPlanView;
