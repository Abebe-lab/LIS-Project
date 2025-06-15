import React, { useState } from "react";
import { Box, Grid, TextField, Button, Stack } from "@mui/material";
//import { FormContainer } from "../../components/Forms";
import { ExecutePostWithParams } from "../../services/api/ExecuteApiRequests";
function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resultData = await ExecutePostWithParams(`users/resetPassword`, {
        email,
      });
      if (resultData) {
        setSuccess(resultData);
      }
      alert("Password reset email sent!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClose = () => {
    onClose(); // Call the provided function to close the component
  };

  return (
    <>
      <Grid container marginBottom={2} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            fullWidth={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Send Reset Email
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Stack>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Box sx={{ color: "red" }}>{error}</Box>
          </Grid>
        )}
        {success && (
          <Grid item xs={12}>
            <Box sx={{ color: "green" }}>{success}</Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ForgotPassword;
