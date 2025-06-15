import React, { useState } from "react";
import { TextField, Grid, Typography, Button, Paper, Box, FormControl } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import useDecodedUser from "../../../../../services/hooks/useDecodedUser";
import FormContainer from "../../../../../components/Forms/FormContainer";
import { ExecuteApiToPost, GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

const displayRequestDetail = async data => {
  return (
    <>
      <Typography variant="h6">Fetched Information</Typography>
      <Typography variant="body1"> Owner: {data.owner}</Typography>
      <Typography variant="body1">TIN No: {data.tinNo}</Typography>
      <Typography variant="body1"> UPIN: {data.upin}</Typography>

      <div>Other details</div>
    </>
  );
};

export default function IssueOccupancyPermit() {
  const decodedUser = useDecodedUser();
  const [id, setId] = useState("");
  const [permit_no, setPermitNo] = useState("");
  //const [tinNo, setTinNo] = useState("");
  const [upin, setUPIN] = useState("");
  const [owner_id, setOwnerId] = useState("");

  const [issued_on, setIssuedOn] = useState("");
  const [starting_date, setStartingDate] = useState("");
  const [finishing_date, setFinishingDate] = useState("");
  const [status, setstatus] = useState("Finished");
  const [description, setDescription] = useState("");
  const [plan_files, setPlanFiles] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const pushFile = e => {
    plan_files.push(e.target.value);
    console.log(plan_files);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const responseData = ExecuteApiToPost("occupancyPermits", {
        id,
        upin,
        owner_id,
        permit_issued_by: decodedUser && decodedUser.id,
        issued_on,
        starting_date,
        finishing_date,
        status,
        description,
        permit_no,
        plan_files,
      });

      if (responseData) {
        setResponseMessage("Occupancy Permit Registration successful!");
      } else {
        setResponseMessage("Occupancy Permit Registration failed: " + responseData);
      }
    } catch (error) {
      setResponseMessage("An error occurred: " + error.message);
      console.log(error);
    }
  };
  const [data, setData] = useState(null);
  const handleKeySubmit = async () => {
    // Make an API call to fetch data based on the key
    try {
      if (!permit_no) {
        return;
      }
      const responseData = await GetDataFromApiWithParams(`occupancyPermit/${permit_no}`);

      setData(responseData);
      displayRequestDetail(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  return (
    <FormContainer title="Issue Occupancy Permit" onSubmit={handleSubmit}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField name="id" label="Id" value={id} onChange={e => setId(e.target.value)} fullWidth={true} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="permit_no"
                    label="Request No"
                    value={permit_no}
                    onChange={e => setPermitNo(e.target.value)}
                    required
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button onClick={handleKeySubmit} variant="contained" fullWidth={true}>
                    {"Fetch Data"}
                  </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    type="text"
                    id="permit_issued_by"
                    value={decodedUser.full_name}
                    placeholder="Issued By"
                    fullWidth={true}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Issued on"
                    type="date"
                    value={issued_on}
                    onChange={e => setIssuedOn(e.target.value)}
                    fullWidth={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Starting Date"
                    type="date"
                    value={starting_date}
                    onChange={e => setStartingDate(e.target.value)}
                    fullWidth={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Finising Date"
                    type="date"
                    value={finishing_date}
                    onChange={e => setFinishingDate(e.target.value)}
                    fullWidth={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    type="text"
                    id="status"
                    value={status}
                    onChange={e => setstatus(e.target.value)}
                    required
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth={true}>
                    <Button variant="contained" component="label" startIcon={<AttachFile />}>
                      Attach Requets Form
                      <input
                        type="file"
                        accept=".pdf, .docx, .doc, .jpeg, .jpg, .png"
                        onChange={e => setPlanFiles(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              {data ? displayRequestDetail : <Typography variant="body1">No data fetched yet.</Typography>}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} md={12}>
        <FormControl fullWidth={true}>
          <TextField
            rows={3}
            name="descriptin"
            id="description"
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
      </Grid>

      {responseMessage && <p>{responseMessage}</p>}
    </FormContainer>
  );
}
