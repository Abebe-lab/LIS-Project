import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Container,
  Alert,
  Typography,
} from "@mui/material";
import ParkList from "../PreRenderedComponents/ParkList";
import FormContainer from "../../../../components/Forms/FormContainer";
import useDecodedUser from "../../../../services/hooks/useDecodedUser";
import { CapitalizeWords } from "../../../../utils/Formatting";
import {
  ExecuteApiToPost,
  GetDataFromApiWithParams,
  UpdateAndGetResponse,
} from "../../../../services/api/ExecuteApiRequests";
export default function MyPreference() {
  const decodedUser = useDecodedUser();
  const [selectedPark, setSelectedPark] = useState(null);
  const [formData, setFormData] = useState({
    userId: decodedUser.id,
    username: decodedUser.username,
    email: decodedUser.email,
    phone: decodedUser.phone,
    notificationPreference: "push",
    darkMode: false,
    preferredLanguage: "English",
  });
  const [message, setMessage] = useState(null);
  useEffect(() => {
    console.log(decodedUser);
    //setFormData();
  }, [decodedUser]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetDataFromApiWithParams(`preferences/${decodedUser.id}`);
        //console.log(response?.data[0]);
        if (responseData) {
          setFormData({
            userId: decodedUser.id,
            username: decodedUser.username,
            email: decodedUser.email,
            phone: decodedUser.phone,
            notificationPreference: responseData[0].notification_preference,
            darkMode: responseData[0].enable_dark_mode,
            preferredLanguage: responseData[0].preferred_language,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [decodedUser]);
  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await UpdateAndGetResponse(`preferences/${decodedUser.id}`, formData);

      //console.log(response);
      if (response) {
        //setFormData(initialData);
        setMessage("Preferences added successfully");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error adding preferences");
    }
    //todo: submit rules to the database
    //POST exec/preferences
  };

  return (
    <Container>
      <FormContainer title={"User Preferences"} onSubmit={handleSubmit}>
        <Grid item xs={12} p={0}>
          <Typography variant="h6">
            {decodedUser.id}
            {":  "}
            {decodedUser && CapitalizeWords(decodedUser["title"] + " " + decodedUser["full_name"])}
          </Typography>
        </Grid>
        <Grid item xs={12} p={0}>
          <TextField
            label="Username"
            name="username"
            value={formData?.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            fullWidth={true}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} p={0}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            fullWidth={true}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} p={0}>
          <TextField
            label="Phone"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            fullWidth={true}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} p={0}>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Notification Preference</FormLabel>
            <RadioGroup
              name="notificationPreference"
              value={formData?.notificationPreference}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="email" control={<Radio />} label="Email" />
              <FormControlLabel value="sms" control={<Radio />} label="SMS" disabled />
              <FormControlLabel value="push" control={<Radio />} label="Push Notification" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} p={0}>
          <FormControlLabel
            control={<Checkbox checked={formData?.darkMode} onChange={handleChange} name="darkMode" color="primary" />}
            label="Enable Dark Mode"
            margin="normal"
            disabled
          />
        </Grid>
        <Grid item xs={12} p={0}>
          <TextField
            label="Preferred Language"
            name="preferredLanguage"
            value={formData?.preferredLanguage}
            onChange={handleChange}
            placeholder="Enter your preferred language"
            required
            fullWidth={true}
            margin="normal"
            disabled
          />
        </Grid>
        {(decodedUser?.department_id?.toUpperCase() === "GIS" ||
          decodedUser?.department_id?.toUpperCase() === "MP" ||
          decodedUser?.department_id?.toUpperCase() === "LI" ||
          decodedUser?.park_id !== "000") && (
          <Grid item xs={12}>
            <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} isRequired={false} />
          </Grid>
        )}
        {message && (
          <Grid item xs={12}>
            <Alert severity="success">{message}</Alert>
          </Grid>
        )}
      </FormContainer>
    </Container>
  );
}
