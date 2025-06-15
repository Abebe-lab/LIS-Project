import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Chip,
  Box,
} from "@mui/material";
import { ParkList, InvestorList } from "../../../Shared/PreRenderedComponents";
import { Link } from "react-router-dom";
import { Add, Delete } from "@mui/icons-material";
import { GetDataFromApiWithParamsAndGetResponse } from "../../../../../services/api/ExecuteApiRequests";

const Step1 = ({
  formData,
  handleChange,
  selectedPark,
  setSelectedPark,
  parcelInPark,
  selectedInvestor,
  setSelectedInvestor,
  nextStep,
}) => {
  // State to manage selected UPINs
  const [selectedUpins, setSelectedUpins] = useState(formData.upin ? [formData.upin] : []);

  // Effect to update formData when selectedUpins changes
  useEffect(() => {
    handleChange({ target: { name: "upin", value: selectedUpins } });
    //console.log(formData);
  }, [selectedUpins]);

  // Function to add a UPIN
  const handleAddUpin = upin => {
    if (!selectedUpins.includes(upin)) {
      setSelectedUpins([...selectedUpins, upin]);
    }
    const theParcel = parcelInPark.filter(parcel => parcel.upin === upin);
    if (theParcel?.length > 0 && theParcel[0]?.type === "shed") {
      formData.ownership_type = "rent";
    }
    //console.log(theParcel);
  };

  // Function to remove a UPIN
  const handleRemoveUpin = upinToRemove => {
    const fliteredUpins = selectedUpins.filter(upin => upin !== upinToRemove);
    setSelectedUpins(fliteredUpins);
    formData.upin = fliteredUpins;
    formData.ownership_type = fliteredUpins.length === 0 ? "" : formData.ownership_type;
  };

  useEffect(() => {
    //console.log("the data is being fetched");
    const getNewId = async () => {
      try {
        if (selectedPark) {
          const result = (await GetDataFromApiWithParamsAndGetResponse(`agreements/${selectedPark.id}/getNewId`)) || "";
          console.log("new id is ", result.data.new_id);
          formData.agreement_id = result.data.new_id;
          //setFor
        } else {
          formData.agreement_id = "";
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewId();
  }, [selectedPark]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Step 1: Basic Information</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ParkList selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="text"
          label="Agreement Id"
          id="agreement_id"
          name="agreement_id"
          value={formData.agreement_id}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="upin">Parcel UPIN (Select one or more)</InputLabel>
          <Select
            labelId="upin"
            id="upin"
            name="upin"
            value=""
            onChange={e => handleAddUpin(e.target.value)}
            displayEmpty
            InputLabelProps={{
              shrink: true,
            }}
          >
            {parcelInPark &&
              parcelInPark.map(parcel => (
                <MenuItem key={parcel?.upin} value={parcel?.upin}>
                  {parcel?.upin}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selectedUpins?.length > 0 ? (
            selectedUpins.map(upin => (
              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                deleteIcon={<Delete sx={{ fill: "red" }} />}
                color="success"
                variant="outlined"
                key={upin}
                label={upin}
                onDelete={() => handleRemoveUpin(upin)}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No Shed or Servce Land Selected
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={9} md={9}>
        <InvestorList selectedInvestor={selectedInvestor} setSelectedInvestor={setSelectedInvestor} />
      </Grid>
      <Grid item xs={3} md={3} display="flex" alignItems="center">
        <Button variant="outlined" component={Link} to="/registerInvestor" startIcon={<Add />}>
          Register New Investor
        </Button>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="ownership_type-label">Tenure Type</InputLabel>
          <Select
            labelId="ownership_type-label"
            id="ownership_type"
            name="ownership_type"
            value={formData.ownership_type}
            onChange={handleChange}
          >
            <MenuItem value="rent">Shed Rent</MenuItem>
            <MenuItem value="lease">Service Land Lease</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={nextStep}>
            <Typography color="inherit">Next</Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step1;
