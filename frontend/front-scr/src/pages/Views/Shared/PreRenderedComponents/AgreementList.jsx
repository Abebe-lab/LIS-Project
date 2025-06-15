import { useEffect, useState } from "react";
import { GetAgreements } from "../CommonData/CommonData";
import { Autocomplete, TextField } from "@mui/material";

// This component is generalized to handle both cases with or without parkId
function BaseAgreementList({ parkId, selectedAgreement, setSelectedAgreement, isRequired = true }) {
  const [agreementsData, setAgreementsData] = useState([]);

  useEffect(() => {
    const fetchAgreements = async () => {
      const agreData = await GetAgreements(parkId);
      const uniqueAgreements = new Map();

      // Filter out agreements with empty IDs and ensure uniqueness
      agreData.forEach(agreement => {
        if (agreement.id) {
          uniqueAgreements.set(agreement.id, agreement);
        }
      });

      setAgreementsData(Array.from(uniqueAgreements.values()));
    };
    fetchAgreements();
  }, [parkId]); // Dependency array includes parkId to allow refetching if parkId changes

  return (
    <Autocomplete
      fullWidth={true}
      options={agreementsData}
      getOptionLabel={(option) => option.id || ""}
      value={selectedAgreement}
      onChange={(event, newValue) => {
        setSelectedAgreement(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select an agreement"
          placeholder="Select an agreement"
          variant="outlined"
          required={isRequired}
        />
      )}
    />
  );
}

// Wrapper component for general agreement selection
export default function AgreementList({ selectedAgreement, setSelectedAgreement, isRequired = true }) {
  return (
    <BaseAgreementList
      selectedAgreement={selectedAgreement}
      setSelectedAgreement={setSelectedAgreement}
      isRequired={isRequired}
    />
  );
}

// Wrapper component for park-specific agreement selection
export function AgreementListInPark({ parkId, selectedAgreement, setSelectedAgreement, isRequired = true }) {
  return (
    <BaseAgreementList
      parkId={parkId}
      selectedAgreement={selectedAgreement}
      setSelectedAgreement={setSelectedAgreement}
      isRequired={isRequired}
    />
  );
}