import React, { useState, useEffect } from "react";
import DetailPlanView from "./DetailPlanView";
import { Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";

import FormContainer from "../../../../../components/Forms/FormContainer";

import useDecodedUser from "../../../../../services/hooks/useDecodedUser";
import { ExecutePostWithParams, GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
import config from "../../../../../config";

const RegisterComment = () => {
  const decodedUser = useDecodedUser();
  const [requestNumber, setRequestNumber] = useState("");
  const [requestNumbers, setRequestNumbers] = useState([]);
  const [commentType, setCommentType] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch request numbers from the API
    GetDataFromApiWithParams("buildingPermits")
      .then((responseData) => {
        setRequestNumbers(responseData);
        console.log(responseData);
      })
      .catch((error) => console.error("Error fetching request numbers", error));
  }, []);

  const validate = () => {
    try {
      let tempErrors = {};
      if (!requestNumber) tempErrors.requestNumber = "Request number is required";
      if (!commentType) tempErrors.commentType = "Comment type is required";
      if (!comment) tempErrors.comment = "Comment is required";
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setMessage("");
      try {
        const responseData = ExecutePostWithParams(`buildingPermit/${requestNumber}/comment`, {
          requestNumber,
          commentedBy: decodedUser.id,
          commentType,
          comment,
        });

        setMessage(responseData.message || "Comment submitted successfully");
        setRequestNumber("");
        setCommentType("");
        setComment("");
      } catch (error) {
        setMessage(error.message || "Error submitting comment");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleViewDetailPlan = (e) => {
    requestNumber && setShowDetail(!showDetail);
  };
  const handleDownloadPlan = async (e) => {
    try {
      if (!(commentType && requestNumber)) return;
      const bpDetail = await GetDataFromApiWithParams(`buildingPermits/${requestNumber.id}`);

      if (!bpDetail || bpDetail.length === 0) {
        console.error("No details found for the selected request number.");
        return;
      }
      let fileToDownload;

      console.log(commentType);
      switch (commentType) {
        case "architectural":
          console.log("entered");
          fileToDownload = bpDetail.plan_archtectural_path;
          break;
        case "sanitary":
          fileToDownload = bpDetail.plan_structural_path;
          break;
        case "structural":
          fileToDownload = bpDetail.plan_sanitary_path;
          break;
        case "electro-mechanical":
          fileToDownload = bpDetail.plan_electro_mechanical_path;
          break;
        case "electrical":
          fileToDownload = bpDetail.plan_electrical_path;
          break;
        case "environmental":
          fileToDownload = bpDetail.plan_environmental_path;
          break;
        case "other":
          fileToDownload = bpDetail.plan_other_path;
          break;
        default:
          console.error("Invalid comment type");
          return null;
      }
      console.log(fileToDownload);
      if (fileToDownload) {
        console.log("download started");
        const link = document.createElement("a");
        link.href = `${config.apiUrl}/${fileToDownload}`;
        console.log(link.href);
        link.setAttribute("download"); // Optional: Specify a filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Download completed");
      } else {
        console.error("No file found for the selected comment type.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [showDetail]);
  return (
    <FormContainer title="Submit Professional Comment" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <InputLabel>Request Number</InputLabel>
          <Select
            value={requestNumber}
            onChange={(e) => setRequestNumber(e.target.value)}
            error={!!errors.requestNumber}
          >
            {requestNumbers.map((num) => (
              <MenuItem key={num.id} value={num.id}>
                {num.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={9} md={9}>
        <FormControl fullWidth={true}>
          <InputLabel>Comment Type</InputLabel>
          <Select value={commentType} onChange={(e) => setCommentType(e.target.value)} error={!!errors.commentType}>
            <MenuItem value="architectural">Architectural</MenuItem>
            <MenuItem value="sanitary">Sanitary</MenuItem>
            <MenuItem value="structural">Structural</MenuItem>
            <MenuItem value="electro-mechanical">Electro-Mechanical</MenuItem>
            <MenuItem value="electrical">Electrical</MenuItem>
            <MenuItem value="environmental">Environmental</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} md={3}>
        <Button startIcon={<Download />} onClick={handleDownloadPlan}>
          Download the {commentType} plan
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={handleViewDetailPlan}>
          View Detail Plan
        </Button>
      </Grid>
      {showDetail && (
        <Grid item xs={12}>
          <DetailPlanView permitRequestNumber={requestNumber} />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          label="Sumary"
          multiline
          rows={4}
          fullWidth={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={!!errors.comment}
          helperText={errors.comment}
        />
      </Grid>
      {message && (
        <Grid item xs={12}>
          <Typography color={message.includes("successfully") ? "green" : "red"}>{message}</Typography>
        </Grid>
      )}
    </FormContainer>
  );
};

export default RegisterComment;
