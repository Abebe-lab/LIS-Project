import React, { useState } from "react";
import { Box, Grid, TextField, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FormContainer from "../../../../../../components/Forms/FormContainer.jsx";

const infrastructureTypes = [
  { label: "Communication", value: "communication" },
  { label: "Power", value: "power" },
  { label: "Storage", value: "storage" },
  { label: "Water", value: "water" },
  { label: "Waste Disposal", value: "waste_disposal" },
];

const NonCadastralDataEntryForm = ({ onSubmit }) => {
  const { control, handleSubmit, watch } = useForm();
  const [selectedType, setSelectedType] = useState("communication");
  const [geomFile, setGeomFile] = useState(null);

  const handleFileChange = (event) => {
    setGeomFile(event.target.files[0]);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("park_id", data.park_id);
    formData.append("name", data.name);
    formData.append("shape_type", data.shape_type);
    formData.append("description", data.description);
    formData.append("geom", geomFile);
    formData.append("capacity", data.capacity);
    formData.append("unit_of_measure", data.unit_of_measure);
    formData.append("sub_type", data.sub_type || "");
    formData.append("output", data.output || "");
    formData.append("capacity_to_serve", data.capacity_to_serve || "");
    formData.append("associated_to_comm_id", data.associated_to_comm_id || "");
    formData.append("associated_to_pow_id", data.associated_to_pow_id || "");

    // Call the onSubmit function with formData
    onSubmit(formData);
  };

  return (
    <FormContainer title="Infrastructure Data Input" onSubmit={handleSubmit(onFormSubmit)}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth={true}>
          <InputLabel>Infrastructure Type</InputLabel>
          <Select value={selectedType} onChange={handleTypeChange} label="Infrastructure Type">
            {infrastructureTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="park_id"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Park ID" fullWidth={true} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Name" fullWidth={true} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="shape_type"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Shape Type" fullWidth={true} />}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Description" fullWidth={true} multiline rows={4} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="capacity"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Capacity" fullWidth={true} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="unit_of_measure"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Unit of Measure" fullWidth={true} />}
        />
      </Grid>

      {/* Additional Fields Based on Infrastructure Type */}
      {selectedType === "communication" && (
        <>
          <Grid item xs={12} md={6}>
            <Controller
              name="sub_type"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Sub Type" fullWidth={true} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="capacity_to_serve"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Capacity to Serve" fullWidth={true} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="associated_to_comm_id"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Associated Communication ID" fullWidth={true} />}
            />
          </Grid>
        </>
      )}

      {selectedType === "power" && (
        <>
          <Grid item xs={12} md={6}>
            <Controller
              name="output"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Output" fullWidth={true} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="capacity_to_serve"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Capacity to Serve" fullWidth={true} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="associated_to_pow_id"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Associated Power ID" fullWidth={true} />}
            />
          </Grid>
        </>
      )}

      <Grid item xs={12}>
        <Box>
          <InputLabel htmlFor="geom-file">Upload Geom File</InputLabel>
          <input
            type="file"
            id="geom-file"
            name="geom-file"
            onChange={handleFileChange}
            style={{ display: "block", marginTop: "8px" }}
          />
        </Box>
      </Grid>
    </FormContainer>
  );
};

export default NonCadastralDataEntryForm;
