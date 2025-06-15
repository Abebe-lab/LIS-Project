import React, { useState, useEffect } from "react";
import { GetDataFromApiWithParams } from "../../../services/api/ExecuteApiRequests";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await GetDataFromApiWithParams("your_api_endpoint",
          {
            params: { query: searchQuery }, // Pass query as a parameter
            // Add other necessary headers or options
          });
        setSuggestions(response.data); // Assuming the API response contains an array of suggestions
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    // Fetch suggestions on initial render and whenever searchQuery changes
    fetchSuggestions();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionSelect = (suggestion) => {
    // Handle suggestion selection, e.g., set a selected value or perform an action
    console.log("Selected suggestion:", suggestion);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="E.g. AABL001001" />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionSelect(suggestion)}>
              {suggestion.name} {/* Replace with appropriate property */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
