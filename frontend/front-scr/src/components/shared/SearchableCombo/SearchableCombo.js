import React, { useState, useEffect, useRef } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { GetDataFromApiWithParams } from "../../../services/api/ExecuteApiRequests";

const SearchableCombo = ({ apiEndpoint, displayValueField, valueField, limit = 10 }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const responseData = await GetDataFromApiWithParams(apiEndpoint)
        
        
        setOptions(responseData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [apiEndpoint]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleSelect = (event, newValue) => {
    setSelectedValue(newValue);
    setInputValue(newValue ? newValue[displayValueField] : "");
  };

  const handleFocus = () => {
    // Clear the input value when the component gains focus
    setInputValue("");
  };

  return (
    <Autocomplete
      id="searchable-combo"
      options={options.slice(0, limit)} // Limit display to 10 values
      getOptionLabel={(option) => option[displayValueField]}
      value={selectedValue}
      onChange={handleSelect}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      onFocus={handleFocus}
      renderInput={(params) => <TextField {...params} label="Search" inputRef={inputRef} fullWidth={true} />}
    />
  );
};

export default SearchableCombo;
