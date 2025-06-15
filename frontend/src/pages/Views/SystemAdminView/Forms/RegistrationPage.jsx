import React, { useState } from "react";
import { DepartmentList, ParkList } from "../../Shared/PreRenderedComponents";
import FormContainer from "../../../../components/Forms/FormContainer";
//prettier-ignore
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Select, MenuItem, Grid,
  Typography, Avatar, InputLabel, Container, Alert } from "@mui/material";
import { passwordRegex } from "../../../../utils/SecurityRules";
import { ExecutePostWithParams } from "../../../../services/api/ExecuteApiRequests";
//prettier-ignore
const initialData = { location: "HO", department_id: "", park_id: "HO", role: "", full_name: "", gender: "", email: "",
                      phone: "", username: "", password: "P@ssw0rd", description: "", profilePicture: null, title: "" };

const RegistrationPage = () => {
  const [formData, setFormData] = useState(initialData);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [preview, setPreview] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    // Password security validation regex

    // Validate password security
    if (!passwordRegex.test(formData.password)) {
      setResponseMessage(
        <Alert severity="error">
          Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a
          special character.
        </Alert>,
      );
      return;
    }
    try {
      const fullFormData = new FormData();
      console.log(formData.profilePicture);
      fullFormData.append("file", formData.profilePicture);
      fullFormData.append("full_name", formData.full_name);
      fullFormData.append("gender", formData.gender);
      fullFormData.append("email", formData.email);
      fullFormData.append("phone", formData.phone);
      fullFormData.append("username", formData.username);
      fullFormData.append("password", formData.password);
      fullFormData.append("description", formData.description);
      fullFormData.append("role", formData.role);
      fullFormData.append("location", formData.location);
      fullFormData.append("title", formData.title);
      fullFormData.append("department_id", selectedDepartment?.id);
      fullFormData.append("park_id", selectedPark ? selectedPark.id : "000");
      const responseData = await ExecutePostWithParams("users", fullFormData, true);

      if (responseData) {
        setResponseMessage(<Alert severity="success">Registration successful!</Alert>);
        setFormData(initialData);
        setPreview("");
        window.location.href = '/userManagement';
      }
    } catch (error) {
      setResponseMessage(<Alert severity="error">"Registration failed: " + {error.message}</Alert>);
      console.log(error);
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];
      formData.profilePicture = file;
      //console.log(formData.profilePicture);
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const getRoleOptions = () => {
    if (selectedDepartment && selectedDepartment.name === "Executives") {
      return [
        <MenuItem key="CEO" value="CEO">
          CEO
        </MenuItem>,
        <MenuItem key="Deputies" value="Deputies">
          Deputies
        </MenuItem>,
        <MenuItem key="Board" value="Board">
          Board
        </MenuItem>,
      ];
    } else {
      return [
        <MenuItem key="Head" value="Head">
          Head
        </MenuItem>,
        <MenuItem key="Professional" value="Professional">
          Professional
        </MenuItem>,
      ];
    }
  };
  return (
    <Container>
      <FormContainer title="System User Registration" onSubmit={handleSubmit}>
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Avatar alt="Profile Picture" src={preview} sx={{ width: 120, height: 120 }}>
            {!preview && "P"}
          </Avatar>
        </Grid>
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Location</FormLabel>
            <RadioGroup row aria-label="location" name="location" value={formData.location} onChange={handleChange}>
              <FormControlLabel value="HO" control={<Radio />} label="Head Office" />
              <FormControlLabel value="park" control={<Radio />} label="Park" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {formData.location === "park" && (
          <Grid item xs={12}>
            <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <DepartmentList selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" name="role" color="info" onChange={handleChange} fullWidth={true}>
              {getRoleOptions()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth={true}>
            <InputLabel id="title-label">Title</InputLabel>
            <Select
              labelId="title-label"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth={true}
            >
              <MenuItem value="">Select Title</MenuItem>
              <MenuItem value="Mr.">Mr.</MenuItem>
              <MenuItem value="Mrs.">Mrs.</MenuItem>
              <MenuItem value="Miss">Miss</MenuItem>
              <MenuItem value="Dr.">Dr.</MenuItem>
              <MenuItem value="Prof.">Prof.</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth={true}
            id="full-name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            label="Full Name"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            label="Username"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            required
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            label="Description"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          {responseMessage && (
            <Typography variant="body2" color="error">
              {responseMessage}
            </Typography>
          )}
        </Grid>
      </FormContainer>
    </Container>
  );
};

export default RegistrationPage;
