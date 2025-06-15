import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import FormContainer from "../../components/Forms/FormContainer";

import useDecodedUser from "../../services/hooks/useDecodedUser";
import ExecuteApiRequest from "../../services/api/ExecuteApiRequest";

const SetNewPassword = () => {
  const decodedUser = useDecodedUser();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!newPassword) tempErrors.newPassword = "New password is required";
    if (newPassword !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setErrors("Passwords do not match!");
        return;
      }
      if (validate()) {
        const formData = new FormData();
        formData.append("userId", decodedUser.id);
        formData.append("newPW", newPassword);
        const result = await ExecuteApiRequest({
          type: "POST",
          targetPoint: `users/${decodedUser.id}/changePassword`,
          formData: formData,
        });
        if (result) {
          // console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer title="Set New Password" onSubmit={handleSubmit}>
      <Grid item xs={3}>
        <TextField
          id="id"
          label="ID"
          type="text"
          fullWidth={true}
          value={decodedUser.id}
          error={!!errors.id}
          helperText={errors.id}
          disabled
        />
      </Grid>
      <Grid item xs={9}>
        <TextField
          id="full_name"
          label="Full Name"
          type="text"
          fullWidth={true}
          value={decodedUser.full_name}
          error={!!errors.id}
          helperText={errors.id}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password"
          label="New Password"
          type="text"
          fullWidth={true}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          inputProps={{
            autocomplete: "new-password",
            form: {
              autocomplete: "off",
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="confirm_password"
          label="Confirm New Password"
          type="text"
          fullWidth={true}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          inputProps={{
            autocomplete: "new-password",
            form: {
              autocomplete: "off",
            },
          }}
        />
      </Grid>
    </FormContainer>
  );
};

export default SetNewPassword;
