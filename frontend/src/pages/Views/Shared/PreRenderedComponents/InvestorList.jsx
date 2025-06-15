import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { GetInvestors } from "../CommonData/CommonData";

export default function InvestorList({ selectedInvestor, setSelectedInvestor, isRequired = true }) {
  const [investorData, setInvestorData] = useState([]);

  useEffect(() => {
    const fetchInvestors = async () => {
      setInvestorData(await GetInvestors());
    };
    fetchInvestors();
  }, []);

  return (
    <Autocomplete
      fullWidth={true}
      options={investorData}
      getOptionLabel={(option) => option.company_name}
      value={selectedInvestor}
      onChange={(event, newValue) => {
        setSelectedInvestor(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select an Investor" variant="outlined" required={isRequired}/>
      )}
    />
  );
}
