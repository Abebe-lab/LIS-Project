import React, { useState, useEffect } from "react";
//prettier-ignore
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const InvestorsInParkList = ({ parkId, onSelectInvestor }) => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchInvestors = async () => {
      if (!parkId) return; // Avoid unnecessary API calls

      // Logic to fetch investors based on parkId (replace with your actual API call)
      const responseData = await GetDataFromApiWithParams(`agreements/inPark/${parkId}`, { parkId });
      const filteredInvestors = [...new Set(responseData.map(agreement => agreement.company_name))].map(companyName => responseData.find(agreement => agreement.company_name === companyName));
      setInvestors(filteredInvestors);
    };

    fetchInvestors();
  }, [parkId]);

  const handleSelectChange = (event) => {
    onSelectInvestor(event.target.value);
  };

  return (
    <FormControl fullWidth={true}>
      <InputLabel id="investor-label">Select Investor</InputLabel>
      <Select
        labelId="investor-label"
        id="investor_id"
        name="investor_id"
        color="info"
        fullWidth={true}
        onChange={handleSelectChange}
        required={true}
      >
        <MenuItem value="">Select Investor</MenuItem>
        {investors.map((investor, index) => (
          <MenuItem key={index} value={investor.company_id}>
            {investor.company_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InvestorsInParkList;