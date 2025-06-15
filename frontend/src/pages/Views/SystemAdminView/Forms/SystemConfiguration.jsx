import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormContainer from "../../../../components/Forms/FormContainer";
import { UpdateAndGetResponse, GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
const SystemConfiguration = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    maintenanceMode: false,
    theme: "light",
    maxUsers: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetDataFromApiWithParams("systemConfig");
        console.log(responseData);
        if (responseData) {
          setSettings({
            siteName: responseData[0].site_name,
            maintenanceMode: responseData[0].maintainance_mode,
            theme: responseData[0].theme,
            maxUsers: responseData[0].max_users,
          });
        }
      } catch (error) {
        console.error("Error fetching system configuration:", error);
      }
    };

    fetchData();
  }, []);
  const handleChange = e => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSwitchChange = e => {
    const { name, checked } = e.target;
    setSettings({ ...settings, [name]: checked });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const postDt = await UpdateAndGetResponse("systemConfig", settings);
      if (postDt) {
        setMessage(postDt);
      }
    } catch (error) {
      console.error("Error fetching system configuration:", error);
      setMessage("Error updating system configuration");
    }
  };

  return (
    <Container>
      <FormContainer title={"System Configuration"} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Site Name"
              variant="outlined"
              fullWidth={true}
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={handleSwitchChange}
                  name="maintenanceMode"
                  color="primary"
                />
              }
              label="Maintenance Mode"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Theme</InputLabel>
              <Select name="theme" value={settings.theme} onChange={handleChange} label="Theme" disabled>
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Max Users"
              variant="outlined"
              fullWidth={true}
              type="number"
              name="maxUsers"
              value={settings.maxUsers}
              onChange={handleChange}
            />
          </Grid>
          {message && (
            <Grid item xs={12}>
              <p>{message}</p>
            </Grid>
          )}
        </Grid>
      </FormContainer>
    </Container>
  );
};

export default SystemConfiguration;
