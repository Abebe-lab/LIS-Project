import { useEffect, useState } from "react";
import { GetContractors } from "../CommonData/CommonData";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ContractorList({ selectedContractor, setSelectedContractor, isRequired = true }) {
  const [contractorsData, setContractorsData] = useState([]);

  useEffect(() => {
    const fetchContractors = async () => {
      setContractorsData(await GetContractors());
    };
    if (contractorsData.length === 0) {
      fetchContractors();
    }
  }, []);//contractorsData?.length

  const handleContractorChange = (e) => {
    const selectedContractorId = e.target.value;
    const selectedContractor = contractorsData.find((contractor) => contractor?.id === selectedContractorId);
    setSelectedContractor(selectedContractor);
  };

  return (
    <>
      {contractorsData && (
        <FormControl fullWidth={true}>
          <InputLabel id="contractor-label">Select a Contractor</InputLabel>
          <Select
            labelId="contractor-label"
            id="contractor_id"
            name="contractor_id"
            color="info"
            value={selectedContractor?.id} // bind selected id state
            onChange={handleContractorChange}
            fullWidth={true}
            required={isRequired}
            sx={{height: 35}}
          >
            {contractorsData && contractorsData.map(
              (contractor) =>
                contractor && (
                  <MenuItem key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}
</>
  );
}
