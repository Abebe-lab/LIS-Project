import { useEffect, useState } from "react";
import { GetConsultants } from "../CommonData/CommonData";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ConsultantList({ selectedConsultant, setSelectedConsultant, isRequired = true }) {
  const [consultantsData, setConsultantsData] = useState([]);

  useEffect(() => {
    const fetchConsultants = async () => {
      setConsultantsData(await GetConsultants());
    };
    if (consultantsData.length === 0) {
      fetchConsultants();
    }
  }, []);

  const handleConsultantChange = (e) => {
    const selectedConsultantId = e.target.value;
    const selectedConsultant = consultantsData.find((consultant) => consultant?.id === selectedConsultantId);
    setSelectedConsultant(selectedConsultant);
  };

  return (
    <>
      {consultantsData && (
        <FormControl fullWidth={true}>
          <InputLabel id="consultant-label">Select a Consultant</InputLabel>
          <Select
            labelId="consultant-label"
            id="consultant_id"
            name="consultant_id"
            color="info"
            value={selectedConsultant?.id} // bind selected id state
            onChange={handleConsultantChange}
            fullWidth={true}
            required={isRequired}
            sx={{height: 35}}
          >
            {consultantsData.map(
              (consultant) =>
                consultant && (
                  <MenuItem key={consultant.id} value={consultant.id}>
                    {consultant.name}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}
</>
  );
}
