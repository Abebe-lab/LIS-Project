import React, { useState } from "react";
import { Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";

const initialData = {
  username: "",
  email: "",
  notificationPreference: "email",
  darkMode: false,
  preferredLanguage: "",
};

export default function UserPreferencesFormTemplate({ title, handleSubmit }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <FormContainer title={title} onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          fullWidth={true}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          fullWidth={true}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Notification Preference</FormLabel>
          <RadioGroup name="notificationPreference" value={formData.notificationPreference} onChange={handleChange} row>
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="sms" control={<Radio />} label="SMS" />
            <FormControlLabel value="push" control={<Radio />} label="Push Notification" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={formData.darkMode} onChange={handleChange} name="darkMode" color="primary" />}
          label="Enable Dark Mode"
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Preferred Language"
          name="preferredLanguage"
          value={formData.preferredLanguage}
          onChange={handleChange}
          placeholder="Enter your preferred language"
          required
          fullWidth={true}
          margin="normal"
        />
      </Grid>
    </FormContainer>
  );
}
